const router = require("express").Router();
const pool = require("../database");

// get all tags
router.get("/", async (req, res) => {
  try {
    const tags = await pool.query("SELECT * FROM tag");

    res.json(tags.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get tags of project
router.get("/:project_id", async (req, res) => {
  try {
    const { project_id } = req.params;

    const tags = await pool.query(
      `SELECT tag.tag_id, name FROM project_tag INNER JOIN tag 
      ON project_tag.tag_id = tag.tag_id
      WHERE project_id = $1`,
      [project_id]
    );

    res.json(tags.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
