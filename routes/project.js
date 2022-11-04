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

module.exports = router;
