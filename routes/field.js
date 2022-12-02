const router = require("express").Router();
const pool = require("../database");

// get all fields
router.get("/", async (req, res) => {
  try {
    const fields = await pool.query("SELECT * FROM field");

    res.json(fields.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get fields of project
router.get("/:project_id", async (req, res) => {
  try {
    const { project_id } = req.params;

    const fields = await pool.query(
      `SELECT field.field_id, name FROM project_field INNER JOIN field 
      ON project_field.field_id = field.field_id
      WHERE project_id = $1`,
      [project_id]
    );

    res.json(fields.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get fields of user
router.get("/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const fields = await pool.query(
      `SELECT * FROM user_field
      WHERE user_id = $1`,
      [user_id]
    );

    res.json(fields.rows);
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;
