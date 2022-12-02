const router = require("express").Router();
const pool = require("../database");

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

module.exports = router;
