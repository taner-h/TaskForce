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

    const response = {
      created: [],
      member: [],
      applied: [],
      opened: [],
      committed: [],
      answered: [],
    };

    if (created && created.length !== 0) {
      const createdQuery = format(
        `select distinct tag_id from project_tag 
      where project_id in (%L)
      order by tag_id asc`,
        created
      );
      const createdTags = await pool.query(createdQuery);
      response.created = createdTags.rows.map((tag) => tag.tag_id);
    }

    if (member && member.length !== 0) {
      const memberQuery = format(
        `select distinct tag_id from project_tag 
    where project_id in (%L)
    order by tag_id asc`,
        member
      );
      const memberTags = await pool.query(memberQuery);
      response.member = memberTags.rows.map((tag) => tag.tag_id);
    }

    if (applied && applied.length !== 0) {
      const appliedQuery = format(
        `select distinct tag_id from project_tag 
    where project_id in (%L)
    order by tag_id asc`,
        applied
      );
      const appliedTags = await pool.query(appliedQuery);

      response.applied = appliedTags.rows.map((tag) => tag.tag_id);
    }

    if (opened && opened.length !== 0) {
      const openedQuery = format(
        `select distinct tag_id from task_tag 
    where task_id in (%L)
    order by tag_id asc`,
        opened
      );
      const openedTags = await pool.query(openedQuery);
      response.opened = openedTags.rows.map((tag) => tag.tag_id);
    }

    if (answered && answered.length !== 0) {
      const answeredQuery = format(
        `select distinct tag_id from task_tag 
    where task_id in (%L)
    order by tag_id asc`,
        answered
      );

      console.log("answeredQuery", answeredQuery);
      const answeredTags = await pool.query(answeredQuery);

      response.answered = answeredTags.rows.map((tag) => tag.tag_id);
    }

    if (committed && committed.length !== 0) {
      const committedQuery = format(
        `select distinct tag_id from task_tag 
    where task_id in (%L)
    order by tag_id asc`,
        committed
      );
      const committedTags = await pool.query(committedQuery);
      response.committed = committedTags.rows.map((tag) => tag.tag_id);
    }

    //  {
    //     created: createdTags.rows.map((tag) => tag.tag_id),
    //     member: memberTags.rows.map((tag) => tag.tag_id),
    //     applied: appliedTags.rows.map((tag) => tag.tag_id),
    //     opened: openedTags.rows.map((tag) => tag.tag_id),
    //     committed: committedTags.rows.map((tag) => tag.tag_id),
    //     answered: answeredTags.rows.map((tag) => tag.tag_id),
    //   };
    console.log("response from service", response);

    res.json(response);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
