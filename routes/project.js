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

// send request to project
router.post("/request", async (req, res) => {
  try {
    const { userId, projectId } = req.body;

    // if user has request don't send request
    const hasRequest = await pool.query(
      "SELECT * FROM request WHERE user_id = $1 AND project_id = $2",
      [userId, projectId]
    );

    if (hasRequest.rows.length !== 0) {
      return res
        .status(401)
        .json("Can't send a request. User already has a request.");
    }

    const isMember = await pool.query(
      "SELECT * FROM member WHERE user_id = $1 AND project_id = $2",
      [userId, projectId]
    );

    if (isMember.rows.length !== 0) {
      return res
        .status(401)
        .json("Can't send a request. User is already a member.");
    }

    const newRequest = await pool.query(
      "INSERT INTO request (user_id, project_id) VALUES ($1, $2) RETURNING *",
      [userId, projectId]
    );

    res.json(newRequest.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// send invite to user
router.post("/invite", async (req, res) => {
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

    const invite = await pool.query(
      "INSERT INTO invite (user_id, project_id) VALUES ($1, $2) RETURNING *",
      [userId, projectId]
    );

    res.json(invite.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// add user to project
router.post("/member", async (req, res) => {
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

    // add user to project
    const member = await pool.query(
      "INSERT INTO member (user_id, project_id) VALUES ($1, $2) RETURNING *",
      [userId, projectId]
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
    const hasRequest = await pool.query(
      "SELECT * FROM request WHERE user_id = $1 AND project_id = $2",
      [userId, projectId]
    );

    if (hasRequest.rows.length !== 0) {
      await pool.query(
        "DELETE FROM request WHERE user_id = $1 AND project_id = $2",
        [userId, projectId]
      );
    }

    res.json(member.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all projects
router.get("/all", async (req, res) => {
  try {
    const projects = await pool.query("SELECT * FROM project");

    res.json(projects.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
