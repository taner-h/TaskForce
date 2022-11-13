const router = require("express").Router();
const pool = require("../database");

// apply to project
router.post("/", async (req, res) => {
  try {
    const { userId, projectId, creditCount } = req.body;

    // if user has request don't send request
    const hasApplication = await pool.query(
      "SELECT * FROM application WHERE user_id = $1 AND project_id = $2",
      [userId, projectId]
    );

    if (hasApplication.rows.length !== 0) {
      return res
        .status(401)
        .json("Can't apply to project. User already has an application.");
    }

    const isMember = await pool.query(
      "SELECT * FROM member WHERE user_id = $1 AND project_id = $2",
      [userId, projectId]
    );

    if (isMember.rows.length !== 0) {
      return res
        .status(401)
        .json("Can't apply to project. User is already a member.");
    }

    const createTime = new Date(Date.now()).toISOString();

    const newApplication = await pool.query(
      `INSERT INTO application (user_id, project_id, credit_count, application_time) 
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, projectId, creditCount, createTime]
    );

    res.json(newApplication.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all applicants of project
router.get("/project/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const applicants = await pool.query(
      `SELECT *, users.name as name, sub_tier.name as sub_tier
        FROM application INNER JOIN users ON users.user_id = application.user_id
        INNER JOIN sub_tier on users.sub_tier_id = sub_tier.sub_tier_id
        WHERE project_id = $1`,
      [id]
    );

    res.json(applicants.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
