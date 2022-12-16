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
        .json("Can't add user to project. User is already a member.");
    }

    const createTime = new Date(Date.now()).toISOString();

    // add user to project
    const member = await pool.query(
      "INSERT INTO member (user_id, project_id, member_time) VALUES ($1, $2, $3) RETURNING *",
      [userId, projectId, createTime]
    );

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

    await pool.query(
      `UPDATE project SET member_count = member_count + 1 where project_id = $1`,
      [projectId]
    );

    res.json(member.rows[0]);

    await pool.query(
      `INSERT INTO notification 
      (owner_id, causer_id, type, action, object_id, object_name, is_seen, create_time) 
      SELECT $1, project.creator_id, 'member', 'insert', $2, project.name, FALSE, $3
      FROM project
      WHERE project_id = $4`,
      [userId, projectId, createTime, projectId]
    );
  } catch (err) {
    console.error(err.message);
  }
});

// get all members of project
router.get("/project/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const members = await pool.query(
      `SELECT *, users.name as name, sub_tier.name as sub_tier
      FROM member INNER JOIN users ON users.user_id = member.user_id
      INNER JOIN sub_tier on users.sub_tier_id = sub_tier.sub_tier_id
      WHERE project_id = $1`,
      [id]
    );

    res.json(members.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// remove member from project
router.delete("/project/:projectId/user/:userId", async (req, res) => {
  try {
    const { projectId, userId } = req.params;

    const members = await pool.query(
      `
    DELETE FROM member WHERE project_id = $1 AND user_id = $2 RETURNING *`,
      [projectId, userId]
    );

    await pool.query(
      `UPDATE project SET member_count = member_count - 1 where project_id = $1`,
      [projectId]
    );

    const createTime = new Date(Date.now()).toISOString();

    await pool.query(
      `INSERT INTO notification 
      (owner_id, causer_id, type, action, object_id, object_name, is_seen, create_time) 
      SELECT $1, project.creator_id, 'member', 'delete', $2, project.name ,FALSE, $3
      FROM project
      WHERE project_id = $4`,
      [userId, projectId, createTime, projectId]
    );

    res.json(members.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
