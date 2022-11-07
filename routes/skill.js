const router = require("express").Router();
const pool = require("../database");

// get all skills
router.get("/", async (req, res) => {
  try {
    const skills = await pool.query("SELECT * FROM skill");

    res.json(skills.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get skills of project
router.get("/:project_id", async (req, res) => {
  try {
    const { project_id } = req.params;

    const skills = await pool.query(
      `SELECT skill.skill_id, name FROM project_skill INNER JOIN skill 
      ON project_skill.skill_id = skill.skill_id
      WHERE project_id = $1`,
      [project_id]
    );

    res.json(skills.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
