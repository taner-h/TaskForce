const router = require("express").Router();
const pool = require("../database");

// send invite to user
router.post("/", async (req, res) => {
  try {
    const { userId, projectId } = req.body;

    // if user has invite don't send invite
    const hasInvite = await pool.query(
      "SELECT * FROM invite WHERE user_id = $1 AND project_id = $2",
      [userId, projectId]
    );

    if (hasInvite.rows.length !== 0) {
      return res
        .status(401)
        .json("Can't send an invite. User is already invited.");
    }

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

    const invite = await pool.query(
      "INSERT INTO invite (user_id, project_id, invite_time) VALUES ($1, $2, $3) RETURNING *",
      [userId, projectId, createTime]
    );

    res.json(invite.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
