const router = require("express").Router();
const pool = require("../database");

// Answer to task
router.post("/", async (req, res) => {
  try {
    const { userId, taskId, repo, answer } = req.body;
    const createTime = new Date(Date.now()).toISOString();

    const newAnswer = await pool.query(
      `INSERT INTO answer (task_id, responder_id, repo, answer, points, create_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [taskId, userId, repo, answer, 0, createTime]
    );

    res.json(newAnswer.rows[0]);

    await pool.query(
      `INSERT INTO notification 
      (owner_id, causer_id, type, action, object_id, object_name, is_seen, create_time) 
      SELECT task.creator_id, $1, 'answer', 'insert', $2, task.title, FALSE, $3
      FROM task
      WHERE task_id = $4`,
      [userId, taskId, createTime, taskId]
    );
  } catch (err) {
    console.error(err.message);
  }
});

// get all answers of task
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const answers = await pool.query(
      `SELECT answer_id, task_id, responder_id, repo, answer, points, answer.create_time,
      users.name as responder_name, users.surname as responder_surname
      FROM answer
      INNER JOIN users ON answer.responder_id = users.user_id
        WHERE task_id = $1`,
      [id]
    );

    res.json(answers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
