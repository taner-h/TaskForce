const router = require("express").Router();
const pool = require("../database");
const auth = require("../middleware/auth");
const constants = require("../data/constants");
const generateFilterProjectQueryString = require("../utils/generateFilterProjectQueryString");
const formatProjectsResponse = require("../utils/formatProjectsResponse");
const getProjectsByRole = require("../utils/getProjectsByRole");
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
    let newTagIds;

    if (newTags !== undefined && newTags.length != 0) {
      const newTagQuery = format(
        "INSERT INTO tag (name) VALUES %L RETURNING *",
        newTags.map((newTag) => [newTag])
      );

      const newInsertedTags = await pool.query(newTagQuery);

      newTagIds = newInsertedTags.rows.map((tag) => tag.tag_id);
      if (tags !== undefined && tags.length != 0) {
        tags.push(...newTagIds);
      }
    }

    // add the already existing project tags
    if (tags !== undefined && tags.length !== 0) {
      const tagQuery = format(
        "INSERT INTO project_tag (project_id, tag_id) VALUES %L",
        tags.map((tag) => [project.rows[0].project_id, tag])
      );

      await pool.query(tagQuery);
    } else {
      const tagQuery = format(
        "INSERT INTO project_tag (project_id, tag_id) VALUES %L",
        newTagIds.map((tag) => [project.rows[0].project_id, tag])
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

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const sortBy = req.query.sortBy || "create_time";
    const order = req.query.order || "ASC";

    const filterQuery = generateFilterProjectQueryString(fields, skills, tags);
    const { query, params } = filterQuery;

    const filteredProjects = await pool.query(query, params);
    const filtered = filteredProjects.rows.map((item) => item.project_id);
    const response = {};

    response.totalItems = filtered.length;
    response.totalPageCount = Math.ceil(response.totalItems / limit);
    response.currentPage = page;
    response.pageSize = limit;
    response.projects = [];

    if (filteredProjects.rowCount === 0) {
      response.currentPageItems = 0;
      response.message = "No projects found with the selected filters.";
      res.json(response);
    } else {
      let projectQuery;

      if (sortBy === "recommended") {
        projectQuery = format(
          `SELECT project_id, creator_id, project.name as project_name, description, 
    summary, repo, project.credit_count as credit_count, member_count,
    project.create_time as create_time, type as project_type, users.name as 
    creator_name, surname as creator_surname, sub_tier.name as sub_tier, 
    (LOG(2, project.credit_count) + LOG(3, project.credit_count) + 2)/2 * random() as rank
    FROM project
    INNER JOIN project_type ON project.project_type_id = project_type.project_type_id
    INNER JOIN users ON project.creator_id = users.user_id
    INNER JOIN sub_tier on users.sub_tier_id = sub_tier.sub_tier_id 
    WHERE project_id IN (%L) ORDER BY rank %s LIMIT %s OFFSET %s `,
          filtered,
          order,
          limit,
          limit * (page - 1)
        );
      } else {
        projectQuery = format(
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
      }

      const projects = await pool.query(projectQuery);
      response.currentPageItems = projects.rows.length;

      const projectIds = projects.rows.map((project) => project.project_id);

      const fieldQuery = format(
        `SELECT * FROM project_field 
        INNER JOIN field ON project_field.field_id = field.field_id
        WHERE project_id IN (%L)`,
        projectIds
      );

      const allFields = await pool.query(fieldQuery);

      const skillQuery = format(
        `SELECT * FROM project_skill 
        INNER JOIN skill ON project_skill.skill_id = skill.skill_id
        WHERE project_id IN (%L)`,
        projectIds
      );

      const allSkills = await pool.query(skillQuery);

      const tagQuery = format(
        `SELECT * FROM project_tag 
        INNER JOIN tag ON project_tag.tag_id = tag.tag_id
        WHERE project_id IN (%L)`,
        projectIds
      );

      const allTags = await pool.query(tagQuery);

      response.projects = formatProjectsResponse(
        projectIds,
        projects.rows,
        allFields.rows,
        allSkills.rows,
        allTags.rows
      );

      res.json(response);
    }
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

// get all project_ids of user
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const creator = await pool.query(
      "SELECT project_id FROM project where creator_id = $1",
      [id]
    );

    const member = await pool.query(
      "SELECT project_id FROM member where user_id = $1",
      [id]
    );

    const applicant = await pool.query(
      "SELECT project_id FROM application where user_id = $1",
      [id]
    );

    const invitee = await pool.query(
      "SELECT project_id FROM invite where user_id = $1",
      [id]
    );

    const response = {
      creator: creator.rows.map((project) => project.project_id),
      member: member.rows.map((project) => project.project_id),
      applicant: applicant.rows.map((project) => project.project_id),
      invitee: invitee.rows.map((project) => project.project_id),
    };

    res.json(response);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/user", async (req, res) => {
  try {
    const projects = req.body;
    const role = req.query.role || "all";

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const sortBy = req.query.sortBy || "create_time";
    const order = req.query.order || "ASC";

    const filtered = getProjectsByRole(projects, role);
    const response = {};

    response.totalItems = filtered.length;
    response.totalPageCount = Math.ceil(response.totalItems / limit);
    response.currentPage = page;
    response.pageSize = limit;
    response.projects = [];

    if (filtered.length === 0) {
      response.currentPageItems = 0;
      response.message = "No projects found with the selected filters.";
      res.json(response);
    } else {
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

      const projectIds = projects.rows.map((project) => project.project_id);

      const fieldQuery = format(
        `SELECT * FROM project_field 
        INNER JOIN field ON project_field.field_id = field.field_id
        WHERE project_id IN (%L)`,
        projectIds
      );

      const allFields = await pool.query(fieldQuery);

      const skillQuery = format(
        `SELECT * FROM project_skill 
        INNER JOIN skill ON project_skill.skill_id = skill.skill_id
        WHERE project_id IN (%L)`,
        projectIds
      );

      const allSkills = await pool.query(skillQuery);

      const tagQuery = format(
        `SELECT * FROM project_tag 
        INNER JOIN tag ON project_tag.tag_id = tag.tag_id
        WHERE project_id IN (%L)`,
        projectIds
      );

      const allTags = await pool.query(tagQuery);

      response.projects = formatProjectsResponse(
        projectIds,
        projects.rows,
        allFields.rows,
        allSkills.rows,
        allTags.rows
      );

      res.json(response);
    }
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/match", async (req, res) => {
  try {
    const {
      userId,
      fields,
      skills,
      created,
      member,
      applied,
      opened,
      committed,
      answered,
      method,
    } = req.body;

    const prevMatches = await pool.query(
      `select project_id from match_project where user_id = $1`,
      [userId]
    );

    const matchIds = prevMatches.rows.map((match) => match.project_id);
    const matchedCount = matchIds.length;

    const query = format(
      `select project.project_id, 
    (LOG(2, project.credit_count) + LOG(3, project.credit_count) + 2)/2 * 
    random() as rank
    from project inner join 
    (select p.project_id,
    COALESCE(field_count, 0) * 5 + 
    COALESCE(skill_count, 0) * 5 + 
    COALESCE(created_tag_count, 0) * 2 + 
    COALESCE(member_tag_count, 0) * 2 +
    COALESCE(applied_tag_count, 0) +
    COALESCE(opened_tag_count, 0) * 2 +
    COALESCE(answered_tag_count, 0) +
    COALESCE(committed_tag_count, 0) 
    as points
    from project p
    left join (select project_id, count(field_id) as field_count 
    from project_field where field_id = ANY (ARRAY[%L]::integer[]) group by project_id) f
    on p.project_id = f.project_id
    left join (select project_id, count(skill_id) as skill_count 
    from project_skill where skill_id  = ANY (ARRAY[%L]::integer[])  group by project_id) s
    on p.project_id = s.project_id
    left join (select project_id, count(tag_id) as created_tag_count 
    from project_tag where tag_id  = ANY (ARRAY[%L]::integer[])  group by project_id) ct
    on p.project_id = ct.project_id
    left join (select project_id, count(tag_id) as member_tag_count 
    from project_tag where tag_id  = ANY (ARRAY[%L]::integer[])  group by project_id) mt
    on p.project_id = mt.project_id
    left join (select project_id, count(tag_id) as applied_tag_count 
    from project_tag where tag_id  = ANY (ARRAY[%L]::integer[])  group by project_id) apt
    on p.project_id = apt.project_id
    left join (select project_id, count(tag_id) as opened_tag_count 
    from project_tag where tag_id  = ANY (ARRAY[%L]::integer[])  group by project_id) ot
    on p.project_id = ot.project_id
    left join (select project_id, count(tag_id) as answered_tag_count 
    from project_tag where tag_id  = ANY (ARRAY[%L]::integer[])  group by project_id) ant
    on p.project_id = ant.project_id
    left join (select project_id, count(tag_id) as committed_tag_count 
    from project_tag where tag_id  = ANY (ARRAY[%L]::integer[])  group by project_id) cot
    on p.project_id = cot.project_id
    order by points desc
    limit 10 + ${matchedCount}) q1
    on project.project_id = q1.project_id
    order by rank desc
    `,
      fields && fields.length !== 0 ? fields : [],
      skills && skills.length !== 0 ? skills : [],
      created && created.length !== 0 ? created : [],
      member && member.length !== 0 ? member : [],
      applied && applied.length !== 0 ? applied : [],
      opened && opened.length !== 0 ? opened : [],
      answered && answered.length !== 0 ? answered : [],
      committed && committed.length !== 0 ? committed : []
    );
    const bestProjects = await pool.query(query);

    const projectIds = bestProjects.rows
      .filter((project) => !matchIds.includes(project.project_id))
      .slice(0, 2)
      .map((project) => project.project_id);

    if (projectIds.length === 0) {
      res.json([]);
    } else {
      const createTime = new Date(Date.now()).toISOString();

      const queryString = format(
        `insert into match_project (project_id, user_id, match_time) values %L`,
        projectIds.map((project) => [project, userId, createTime])
      );

      await pool.query(queryString);

      const projectQuery = format(
        `SELECT project_id, creator_id, project.name as project_name, description, 
  summary, repo, project.credit_count as credit_count, member_count,
  project.create_time as create_time, type as project_type, users.name as 
  creator_name, surname as creator_surname, sub_tier.name as sub_tier
  FROM project
  INNER JOIN project_type ON project.project_type_id = project_type.project_type_id
  INNER JOIN users ON project.creator_id = users.user_id
  INNER JOIN sub_tier on users.sub_tier_id = sub_tier.sub_tier_id 
  WHERE project_id IN (%L) `,
        projectIds
      );

      const projects = await pool.query(projectQuery);

      const fieldQuery = format(
        `SELECT * FROM project_field 
      INNER JOIN field ON project_field.field_id = field.field_id
      WHERE project_id IN (%L)`,
        projectIds
      );

      const allFields = await pool.query(fieldQuery);

      const skillQuery = format(
        `SELECT * FROM project_skill 
      INNER JOIN skill ON project_skill.skill_id = skill.skill_id
      WHERE project_id IN (%L)`,
        projectIds
      );

      const allSkills = await pool.query(skillQuery);

      const tagQuery = format(
        `SELECT * FROM project_tag 
      INNER JOIN tag ON project_tag.tag_id = tag.tag_id
      WHERE project_id IN (%L)`,
        projectIds
      );

      const allTags = await pool.query(tagQuery);

      response = formatProjectsResponse(
        projectIds,
        projects.rows,
        allFields.rows,
        allSkills.rows,
        allTags.rows
      );

      if (method === "free") {
        pool.query(
          `update users set match_credit = match_credit - 1 where user_id = $1`,
          [userId]
        );
      } else if (method === "credit") {
        pool.query(
          `update users set credit_count = credit_count - 3 where user_id = $1`,
          [userId]
        );
      }

      res.json(response);
    }
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/match/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const projects = await pool.query(
      `SELECT project_id from match_project where user_id = $1`,
      [userId]
    );

    const projectIds = projects.rows.map((project) => project.project_id);
    if (projectIds.length === 0) {
      res.json([]);
    } else {
      const projectQuery = format(
        `SELECT project_id, creator_id, project.name as project_name, description, 
  summary, repo, project.credit_count as credit_count, member_count,
  project.create_time as create_time, type as project_type, users.name as 
  creator_name, surname as creator_surname, sub_tier.name as sub_tier
  FROM project
  INNER JOIN project_type ON project.project_type_id = project_type.project_type_id
  INNER JOIN users ON project.creator_id = users.user_id
  INNER JOIN sub_tier on users.sub_tier_id = sub_tier.sub_tier_id 
  WHERE project_id IN (%L) `,
        projectIds
      );

      const projects = await pool.query(projectQuery);

      const fieldQuery = format(
        `SELECT * FROM project_field 
      INNER JOIN field ON project_field.field_id = field.field_id
      WHERE project_id IN (%L)`,
        projectIds
      );

      const allFields = await pool.query(fieldQuery);

      const skillQuery = format(
        `SELECT * FROM project_skill 
      INNER JOIN skill ON project_skill.skill_id = skill.skill_id
      WHERE project_id IN (%L)`,
        projectIds
      );

      const allSkills = await pool.query(skillQuery);

      const tagQuery = format(
        `SELECT * FROM project_tag 
      INNER JOIN tag ON project_tag.tag_id = tag.tag_id
      WHERE project_id IN (%L)`,
        projectIds
      );

      const allTags = await pool.query(tagQuery);

      response = formatProjectsResponse(
        projectIds,
        projects.rows,
        allFields.rows,
        allSkills.rows,
        allTags.rows
      );

      res.json(response);
    }
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
