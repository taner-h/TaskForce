const router = require("express").Router();
const pool = require("../database");

// add user to project
router.post("/", async (req, res) => {
  try {
    const { userId, projectId } = req.body;

    // check if user is already member
    const isMember = await pool.query(
      "SELECT * FROM member WHERE user_id = $1 AND project_id = $2",
      [userId, projectId]
    );

    if (isMember.rows.length !== 0) {
      return res
        .status(401)
        .json("Can't send an invite. User is already a member.");
    }

    const createTime = new Date(Date.now()).toISOString();

    // add user to project
    const member = await pool.query(
      "INSERT INTO member (user_id, project_id, member_time) VALUES ($1, $2, $3) RETURNING *",
      [userId, projectId, createTime]
    );

    // if user has invite delete invite
    const hasInvite = await pool.query(
      "SELECT * FROM invite WHERE user_id = $1 AND project_id = $2",
      [userId, projectId]
    );

    if (hasInvite.rows.length !== 0) {
      await pool.query(
        "DELETE FROM invite WHERE user_id = $1 AND project_id = $2",
        [userId, projectId]
      );
    }

    // if user has request delete request
    const hasApplication = await pool.query(
      "SELECT * FROM application WHERE user_id = $1 AND project_id = $2",
      [userId, projectId]
    );

    if (hasApplication.rows.length !== 0) {
      await pool.query(
        "DELETE FROM application WHERE user_id = $1 AND project_id = $2",
        [userId, projectId]
      );
    }

    res.json(member.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
