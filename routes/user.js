const router = require("express").Router();
const pool = require("../database");
const format = require("pg-format");

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");

    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query(
      `SELECT *, users.name as name, sub_tier.name as sub_tier FROM users 
      INNER JOIN sub_tier on users.sub_tier_id = sub_tier.sub_tier_id 
      WHERE user_id = $1`,
      [id]
    );

    const response = user.rows[0];

    const fields = await pool.query(
      `SELECT field.field_id, name FROM user_field 
      INNER JOIN field ON user_field.field_id = field.field_id 
       WHERE user_id = $1`,
      [id]
    );

    const skills = await pool.query(
      `SELECT skill.skill_id, name FROM user_skill
      INNER JOIN skill ON user_skill.skill_id = skill.skill_id 
      WHERE user_id = $1`,
      [id]
    );

    response.fields = fields.rows;
    response.skills = skills.rows;

    res.json(response);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/tags", async (req, res) => {
  try {
    const { created, member, applied, opened, committed, answered } = req.body;
    const createdQuery = format(
      `select distinct tag_id from project_tag 
    where project_id in (%L)
    order by tag_id asc`,
      created
    );
    const createdTags = await pool.query(createdQuery);

    const memberQuery = format(
      `select distinct tag_id from project_tag 
    where project_id in (%L)
    order by tag_id asc`,
      member
    );
    const memberTags = await pool.query(memberQuery);

    const appliedQuery = format(
      `select distinct tag_id from project_tag 
    where project_id in (%L)
    order by tag_id asc`,
      applied
    );
    const appliedTags = await pool.query(appliedQuery);

    const openedQuery = format(
      `select distinct tag_id from task_tag 
    where task_id in (%L)
    order by tag_id asc`,
      opened
    );
    const openedTags = await pool.query(openedQuery);

    const answeredQuery = format(
      `select distinct tag_id from task_tag 
    where task_id in (%L)
    order by tag_id asc`,
      answered
    );
    const answeredTags = await pool.query(answeredQuery);

    const committedQuery = format(
      `select distinct tag_id from task_tag 
    where task_id in (%L)
    order by tag_id asc`,
      committed
    );
    const committedTags = await pool.query(committedQuery);

    const response = {
      created: createdTags.rows.map((tag) => tag.tag_id),
      member: memberTags.rows.map((tag) => tag.tag_id),
      applied: appliedTags.rows.map((tag) => tag.tag_id),
      opened: openedTags.rows.map((tag) => tag.tag_id),
      committed: committedTags.rows.map((tag) => tag.tag_id),
      answered: answeredTags.rows.map((tag) => tag.tag_id),
    };

    res.json(response);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
