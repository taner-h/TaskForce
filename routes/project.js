const router = require("express").Router();
const pool = require("../database");
const auth = require("../middleware/auth");
const constants = require("../data/constants");
const generateFilterQueryString = require("../utils/generateFilterQueryString");
const format = require("pg-format");
// Add a project
router.post("/", async (req, res) => {
  try {
    const {
      creatorId,
      name,
      description,
      summary,
      repo,
      creditCount,
      projectTypeId,
      fields,
      skills,
      tags,
      newTags,
      resources,
    } = req.body;

    const createTime = new Date(Date.now()).toISOString();

    // add the project
    const project = await pool.query(
      `INSERT INTO project (creator_id, name, description, summary, repo, 
        credit_count, create_time, project_type_id, member_count) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0) RETURNING *`,
      [
        creatorId,
        name,
        description,
        summary,
        repo,
        creditCount,
        createTime,
        projectTypeId,
      ]
    );

    // decrease the user's credit
    await pool.query(
      `UPDATE users SET credit_count = credit_count - $1 where user_id = $2`,
      [creditCount, creatorId]
    );

    // add the project fields

    if (fields !== undefined && fields.length != 0) {
      const fieldQuery = format(
        "INSERT INTO project_field (project_id, field_id) VALUES %L",
        fields.map((field) => [project.rows[0].project_id, field])
      );

      await pool.query(fieldQuery);
    }

    // add the project skills
    if (skills !== undefined && skills.length != 0) {
      const skillQuery = format(
        "INSERT INTO project_skill (project_id, skill_id) VALUES %L",
        skills.map((skill) => [project.rows[0].project_id, skill])
      );

      await pool.query(skillQuery);
    }

    if (newTags !== undefined && newTags.length != 0) {
      const newTagQuery = format(
        "INSERT INTO tag (name) VALUES %L RETURNING *",
        newTags.map((newTag) => [newTag])
      );

      const newInsertedTags = await pool.query(newTagQuery);

      const newTagIds = newInsertedTags.rows.map((tag) => tag.tag_id);
      if (tags !== undefined && tags.length != 0) {
        tags.push(...newTagIds);
      }
    }

    // add the already existing project tags
    if (tags !== undefined && tags.length != 0) {
      const tagQuery = format(
        "INSERT INTO project_tag (project_id, tag_id) VALUES %L",
        tags.map((tag) => [project.rows[0].project_id, tag])
      );

      await pool.query(tagQuery);
    }

    // add the project resources
    if (resources !== undefined && resources.length != 0) {
      const resourceQuery = format(
        "INSERT INTO resource (project_id, title, link) VALUES %L",
        resources.map((resource) => [
          project.rows[0].project_id,
          resource.title,
          resource.link,
        ])
      );
      await pool.query(resourceQuery);
    }

    res.json(project.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all projects
router.get("/all", async (req, res) => {
  try {
    const projects = await pool.query("SELECT * FROM project");

    res.json(projects.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// filter projects
router.post("/search", async (req, res) => {
  try {
    const { fields, tags, skills } = req.body;

    const page = req.query.page || 1;
    const limit = req.query.limit || 9;
    const sortBy = req.query.sortBy || "create_time";
    const order = req.query.order || "ASC";

    const filterQuery = generateFilterQueryString(fields, tags, skills);
    const { query, params } = filterQuery;

    const filteredProjects = await pool.query(query, params);
    const filtered = filteredProjects.rows.map((item) => item.project_id);

    const response = {};

    response.totalItems = filtered.length;
    response.totalPageCount = Math.ceil(response.totalItems / limit);
    response.currentPageItems;
    response.currentPage = parseInt(page);
    response.pageSize = limit;
    response.content = {};

    if (filtered.length === 0) {
      response.currentPageItems = 0;
      response.message = "No projects found with the selected filters.";
      res.json(response);
    }

    const projectQuery = format(
      `SELECT project_id, creator_id, project.name as project_name, description, 
    summary, repo, project.credit_count as credit_count, member_count,
    project.create_time as create_time, type as project_type, users.name as 
    creator_name, surname as creator_surname, sub_tier.name as sub_tier
    FROM project
    INNER JOIN project_type ON project.project_type_id = project_type.project_type_id
    INNER JOIN users ON project.creator_id = users.user_id
    INNER JOIN sub_tier on users.sub_tier_id = sub_tier.sub_tier_id 
    WHERE project_id IN (%L) ORDER BY %I %s LIMIT %s OFFSET %s `,
      filtered,
      sortBy,
      order,
      limit,
      limit * (page - 1)
    );

    const projects = await pool.query(projectQuery);
    response.currentPageItems = projects.rows.length;
    response.content.projects = projects.rows;

    const projectIds = projects.rows.map((project) => project.project_id);

    const fieldQuery = format(
      `SELECT * FROM project_field 
        INNER JOIN field ON project_field.field_id = field.field_id
        WHERE project_id IN (%L)`,
      projectIds
    );

    const allFields = await pool.query(fieldQuery);
    response.content.fields = allFields.rows;

    const skillQuery = format(
      `SELECT * FROM project_skill 
        INNER JOIN skill ON project_skill.skill_id = skill.skill_id
        WHERE project_id IN (%L)`,
      projectIds
    );

    const allSkills = await pool.query(skillQuery);
    response.content.skills = allSkills.rows;

    const tagQuery = format(
      `SELECT * FROM project_tag 
        INNER JOIN tag ON project_tag.tag_id = tag.tag_id
        WHERE project_id IN (%L)`,
      projectIds
    );

    const allTags = await pool.query(tagQuery);
    response.content.tags = allTags.rows;

    res.json(response);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await pool.query(
      `SELECT * FROM project INNER JOIN project_type
      ON project.project_type_id = project_type.project_type_id 
      WHERE project_id = $1`,
      [id]
    );

    const response = project.rows[0];

    const creator = await pool.query(
      `SELECT *, users.name as name, sub_tier.name as sub_tier FROM users 
      INNER JOIN sub_tier on users.sub_tier_id = sub_tier.sub_tier_id 
      WHERE user_id = $1`,
      [id]
    );

    response.creator = creator.rows[0];

    const member_count = await pool.query(
      `SELECT count(*) FROM member WHERE project_id = $1;`,
      [id]
    );

    response.member_count = member_count.rows[0].count;

    const fields = await pool.query(
      `SELECT field.field_id, name FROM project_field INNER JOIN field 
      ON project_field.field_id = field.field_id
      WHERE project_id = $1`,
      [id]
    );

    response.fields = fields.rows;

    const tags = await pool.query(
      `SELECT tag.tag_id, name FROM project_tag INNER JOIN tag 
      ON project_tag.tag_id = tag.tag_id
      WHERE project_id = $1`,
      [id]
    );
    response.tags = tags.rows;

    const skills = await pool.query(
      `SELECT skill.skill_id, name FROM project_skill INNER JOIN skill 
      ON project_skill.skill_id = skill.skill_id
      WHERE project_id = $1`,
      [id]
    );

    response.skills = skills.rows;

    const resources = await pool.query(
      `SELECT resource_id, title, link FROM resource WHERE project_id = $1`,
      [id]
    );

    response.resources = resources.rows;

    res.json(response);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
