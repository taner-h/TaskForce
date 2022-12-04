const router = require("express").Router();
const pool = require("../database");

// get all commits
router.get("/all", async (req, res) => {
  try {
    const commits = await pool.query("SELECT * FROM commit");

    res.json(commits.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Commit to task
router.post("/", async (req, res) => {
  try {
    const { userId, taskId } = req.body;
    const createTime = new Date(Date.now()).toISOString();

    await pool.query(`INSERT INTO commit VALUES ($1, $2, $3) RETURNING *`, [
      taskId,
      userId,
      createTime,
    ]);

    const commit_count = await pool.query(
      `UPDATE task SET commit_count = commit_count + 1 RETURNING commit_count`
    );

    res.json(commit_count.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Commit to task
router.delete("/", async (req, res) => {
  try {
    const { userId, taskId } = req.body;

    await pool.query(
      `DELETE FROM commit where user_id = $1 AND task_id = $2 RETURNING *`,
      [userId, taskId]
    );

    const commit_count = await pool.query(
      `UPDATE task SET commit_count = commit_count - 1 RETURNING commit_count`
    );

    res.json(commit_count.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
