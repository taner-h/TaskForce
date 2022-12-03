const router = require("express").Router();
const pool = require("../database");
const format = require("pg-format");

// get all tasks
router.get("/all", async (req, res) => {
  try {
    const tags = await pool.query("SELECT * FROM task");
    res.json(tags.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Add a task
router.post("/", async (req, res) => {
  try {
    const {
      creatorId,
      title,
      repo,
      description,
      creditFee,
      creditReward,
      fields,
      skills,
      tags,
      newTags,
    } = req.body;

    const createTime = new Date(Date.now()).toISOString();

    // add the task
    const task = await pool.query(
      `INSERT INTO task (creator_id, title, description, repo, 
          credit_count, credit_reward, create_time) 
          VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [creatorId, title, description, repo, creditFee, creditReward, createTime]
    );

    // decrease the user's credit
    await pool.query(
      `UPDATE users SET credit_count = credit_count - $1 where user_id = $2`,
      [creditFee, creatorId]
    );

    // add the task fields

    if (fields !== undefined && fields.length != 0) {
      const fieldQuery = format(
        "INSERT INTO task_field (task_id, field_id) VALUES %L",
        fields.map((field) => [task.rows[0].task_id, field])
      );

      await pool.query(fieldQuery);
    }

    // add the task skills
    if (skills !== undefined && skills.length != 0) {
      const skillQuery = format(
        "INSERT INTO task_skill (task_id, skill_id) VALUES %L",
        skills.map((skill) => [task.rows[0].task_id, skill])
      );

      await pool.query(skillQuery);
    }

    if (newTags !== undefined && newTags.length != 0) {
      const newTagQuery = format(
        "INSERT INTO tag (name) VALUES %L RETURNING *",
        newTags.map((newTag) => [newTag])
      );

      const newInsertedTags = await pool.query(newTagQuery);

      const newTagIds = newInsertedTags.rows.map((tag) => tag.tag_id);

      if (tags !== undefined && tags.length != 0) {
        tags.push(...newTagIds);
      }
    }

    // add the already existing task tags
    if (tags !== undefined && tags.length != 0) {
      const tagQuery = format(
        "INSERT INTO task_tag (task_id, tag_id) VALUES %L",
        tags.map((tag) => [task.rows[0].task_id, tag])
      );

      await pool.query(tagQuery);
    } else {
      const tagQuery = format(
        "INSERT INTO task_tag (task_id, tag_id) VALUES %L",
        newTagIds.map((tag) => [task.rows[0].task_id, tag])
      );

      await pool.query(tagQuery);
    }

    res.json(task.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
