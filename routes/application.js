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

    await pool.query(
      `UPDATE users SET credit_count = credit_count - $1 where user_id = $2`,
      [creditCount, userId]
    );

    await pool.query(
      `INSERT INTO notification 
      (owner_id, causer_id, type, action, object_id, object_name, is_seen, create_time) 
      SELECT project.creator_id, $1, 'application', 'insert', $2, project.name, FALSE, $3
      FROM project
      WHERE project_id = $4`,
      [userId, projectId, createTime, projectId]
    );
  } catch (err) {
    console.error(err.message);
  }
});

// get all applicants of project
router.get("/project/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const applicantCount = await pool.query(
      `SELECT *, users.name as name, sub_tier.name as sub_tier
        FROM application INNER JOIN users ON users.user_id = application.user_id
        INNER JOIN sub_tier on users.sub_tier_id = sub_tier.sub_tier_id
        WHERE project_id = $1`,
      [id]
    );

    const response = {};
    response.totalItems = applicantCount.rowCount;
    response.totalPageCount = Math.ceil(response.totalItems / limit);
    response.currentPage = page;
    response.pageSize = limit;

    const applicants = await pool.query(
      `SELECT (LOG(2, application.credit_count) +
      LOG(3, application.credit_count) + 2)/2 * random() as rank, project_id, users.user_id, application_time,
      users.name as name, surname, sub_tier.name as sub_tier, email
      FROM application INNER JOIN users ON users.user_id = application.user_id
      INNER JOIN sub_tier on users.sub_tier_id = sub_tier.sub_tier_id
      WHERE project_id = $1
      ORDER BY rank desc
      LIMIT $2 OFFSET $3
      `,
      [id, limit, limit * (page - 1)]
    );

    response.applicants = applicants.rows;

    res.json(response);
  } catch (err) {
    console.error(err.message);
  }
});

// delete application
router.delete("/project/:projectId/user/:userId", async (req, res) => {
  try {
    const { projectId, userId } = req.params;

    const application = await pool.query(
      `DELETE FROM application WHERE project_id = $1 AND user_id = $2 RETURNING *`,
      [projectId, userId]
    );

    res.json(application.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
