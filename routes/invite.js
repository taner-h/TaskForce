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

// get all invites of project
router.get("/project/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const invites = await pool.query(
      `SELECT *, users.name as name, sub_tier.name as sub_tier
      FROM invite INNER JOIN users ON users.user_id = invite.user_id
      INNER JOIN sub_tier on users.sub_tier_id = sub_tier.sub_tier_id
      WHERE project_id = $1`,
      [id]
    );

    res.json(invites.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get all invites of user
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const invites = await pool.query(
      `SELECT * FROM invite 
      INNER JOIN project ON invite.project_id = project.project_id
      INNER JOIN project_type ON project.project_type_id = project_type.project_type_id
      WHERE invite.user_id = $1`,
      [id]
    );

    res.json(invites.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
