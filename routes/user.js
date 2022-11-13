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

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
