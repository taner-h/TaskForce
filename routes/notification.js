const router = require("express").Router();
const pool = require("../database");

router.get("/new/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const notifications = await pool.query(
      `SELECT * FROM notification
        WHERE owner_id = $1 and is_seen = FALSE`,
      [id]
    );

    res.json(notifications.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/all/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const notifications = await pool.query(
      `SELECT * FROM notification
        WHERE owner_id = $1`,
      [id]
    );

    res.json(notifications.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
