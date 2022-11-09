const router = require("express").Router();
const pool = require("../database");
const auth = require("../middleware/auth");
const constants = require("../data/constants");

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
    } = req.body;

    const createTime = new Date(Date.now()).toISOString();

    // add the project
    const project = await pool.query(
      `INSERT INTO project (creator_id, name, description, summary, repo, 
        credit_count, create_time, project_type_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
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
    for (const field of fields) {
      await pool.query(
        "INSERT INTO project_field (project_id, field_id) VALUES ($1, $2)",
        [project.rows[0].project_id, field]
      );
    }

    // add the project skills
    for (const skill of skills) {
      await pool.query(
        "INSERT INTO project_skill (project_id, skill_id) VALUES ($1, $2)",
        [project.rows[0].project_id, skill]
      );
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

    const members = await pool.query(
      `SELECT *, users.name as name, sub_tier.name as sub_tier 
      FROM member INNER JOIN users ON users.user_id = member.user_id
      INNER JOIN sub_tier on users.sub_tier_id = sub_tier.sub_tier_id 
      WHERE project_id = $1`,
      [id]
    );

    response.members = members.rows;

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
