const router = require("express").Router();
const pool = require("../database");

router.get("/new/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const notifications = await pool.query(
      `SELECT notification_id, owner_id, causer_id, type, action, object_id, 
    object_name, is_seen, notification.create_time, users.name as causer_name,
    users.surname as causer_surname
    FROM notification
    INNER JOIN users on notification.causer_id = users.user_id
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
      `SELECT notification_id, owner_id, causer_id, type, action, object_id, 
      object_name, is_seen, notification.create_time, users.name as causer_name,
      users.surname as causer_surname
      FROM notification
      INNER JOIN users on notification.causer_id = users.user_id
      WHERE owner_id = $1`,
      [id]
    );

    res.json(notifications.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const notifications = await pool.query(
      `UPDATE notification 
      SET is_seen = TRUE
      WHERE owner_id = $1`,
      [id]
    );

    res.json(notifications.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
