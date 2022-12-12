const router = require("express").Router();
const pool = require("../database");
const format = require("pg-format");
const formatTasksResponse = require("../utils/formatTasksResponse");
const generateFilterTaskQueryString = require("../utils/generateFilterTaskQueryString");
const getTasksByType = require("../utils/getTasksByType");

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
          credit_count, credit_reward, create_time, answer_count, commit_count) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, 0, 0) RETURNING *`,
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

// filter tasks
router.post("/search", async (req, res) => {
  try {
    const { fields, tags, skills } = req.body;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const sortBy = req.query.sortBy || "create_time";
    const order = req.query.order || "ASC";

    const filterQuery = generateFilterTaskQueryString(fields, skills, tags);
    const { query, params } = filterQuery;
    const filteredTasks = await pool.query(query, params);

    // const filteredTasks = await pool.query(`select task_id from task`);

    const filtered = filteredTasks.rows.map((item) => item.task_id);
    const response = {};

    response.totalItems = filtered.length;
    response.totalPageCount = Math.ceil(response.totalItems / limit);
    response.currentPage = page;
    response.pageSize = limit;
    response.tasks = [];

    if (filteredTasks.rowCount === 0) {
      response.currentPageItems = 0;
      response.message = "No tasks found with the selected filters.";
      res.json(response);
    } else {
      let taskQuery;
      if (sortBy === "recommended") {
        taskQuery = format(
          `SELECT task_id, creator_id, title, description, repo, 
      task.credit_count as credit_count, credit_reward, task.create_time as 
      create_time, users.name as creator_name, surname as creator_surname, 
      sub_tier.name as sub_tier, commit_count, answer_count, 
      (LOG(2, task.credit_count + credit_reward) + 
      LOG(3, task.credit_count + credit_reward) + 2)/2 * random() as rank
      FROM task
      INNER JOIN users ON task.creator_id = users.user_id
      INNER JOIN sub_tier on users.sub_tier_id = sub_tier.sub_tier_id 
      WHERE task_id IN (%L) ORDER BY rank %s LIMIT %s OFFSET %s `,
          filtered,
          order,
          limit,
          limit * (page - 1)
        );
      } else {
        taskQuery = format(
          `SELECT task_id, creator_id, title, description, repo, 
      task.credit_count as credit_count, credit_reward, task.create_time as 
      create_time, users.name as creator_name, surname as creator_surname, 
      sub_tier.name as sub_tier, commit_count, answer_count
      FROM task
      INNER JOIN users ON task.creator_id = users.user_id
      INNER JOIN sub_tier on users.sub_tier_id = sub_tier.sub_tier_id 
      WHERE task_id IN (%L) ORDER BY %I %s LIMIT %s OFFSET %s `,
          filtered,
          sortBy,
          order,
          limit,
          limit * (page - 1)
        );
      }

      const tasks = await pool.query(taskQuery);
      response.currentPageItems = tasks.rows.length;

      const taskIds = tasks.rows.map((task) => task.task_id);

      const fieldQuery = format(
        `SELECT * FROM task_field 
        INNER JOIN field ON task_field.field_id = field.field_id
        WHERE task_id IN (%L)`,
        taskIds
      );

      const allFields = await pool.query(fieldQuery);

      const skillQuery = format(
        `SELECT * FROM task_skill 
        INNER JOIN skill ON task_skill.skill_id = skill.skill_id
        WHERE task_id IN (%L)`,
        taskIds
      );

      const allSkills = await pool.query(skillQuery);

      const tagQuery = format(
        `SELECT * FROM task_tag 
        INNER JOIN tag ON task_tag.tag_id = tag.tag_id
        WHERE task_id IN (%L)`,
        taskIds
      );

      const allTags = await pool.query(tagQuery);

      response.tasks = formatTasksResponse(
        taskIds,
        tasks.rows,
        allFields.rows,
        allSkills.rows,
        allTags.rows
      );

      res.json(response);
    }
  } catch (err) {
    console.error(err.message);
  }
});

// get all task_ids of user
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const created = await pool.query(
      "SELECT task_id FROM task where creator_id = $1",
      [id]
    );

    const answered = await pool.query(
      "SELECT task_id FROM answer where responder_id = $1",
      [id]
    );

    const committed = await pool.query(
      "SELECT task_id FROM commit where user_id = $1",
      [id]
    );

    const response = {
      created: created.rows.map((task) => task.task_id),
      answered: answered.rows.map((task) => task.task_id),
      committed: committed.rows.map((task) => task.task_id),
    };

    res.json(response);
  } catch (err) {
    console.error(err.message);
  }
});

// get tasks of user by task_ids
router.post("/user", async (req, res) => {
  try {
    const tasks = req.body;
    const type = req.query.type || "all";

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const sortBy = req.query.sortBy || "create_time";
    const order = req.query.order || "ASC";

    const filtered = getTasksByType(tasks, type);
    const response = {};

    response.totalItems = filtered.length;
    response.totalPageCount = Math.ceil(response.totalItems / limit);
    response.currentPage = page;
    response.pageSize = limit;
    response.tasks = [];

    if (filtered.length === 0) {
      response.currentPageItems = 0;
      response.message = "No tasks found with the selected filters.";
      res.json(response);
    } else {
      const taskQuery = format(
        `SELECT task_id, creator_id, title, description, repo, 
    task.credit_count as credit_count, credit_reward, task.create_time as 
    create_time, users.name as creator_name, surname as creator_surname, 
    sub_tier.name as sub_tier, commit_count, answer_count
    FROM task
    INNER JOIN users ON task.creator_id = users.user_id
    INNER JOIN sub_tier on users.sub_tier_id = sub_tier.sub_tier_id 
    WHERE task_id IN (%L) ORDER BY %I %s LIMIT %s OFFSET %s `,
        filtered,
        sortBy,
        order,
        limit,
        limit * (page - 1)
      );

      const tasks = await pool.query(taskQuery);
      response.currentPageItems = tasks.rows.length;

      const taskIds = tasks.rows.map((task) => task.task_id);

      const fieldQuery = format(
        `SELECT * FROM task_field 
        INNER JOIN field ON task_field.field_id = field.field_id
        WHERE task_id IN (%L)`,
        taskIds
      );

      const allFields = await pool.query(fieldQuery);

      const skillQuery = format(
        `SELECT * FROM task_skill 
        INNER JOIN skill ON task_skill.skill_id = skill.skill_id
        WHERE task_id IN (%L)`,
        taskIds
      );

      const allSkills = await pool.query(skillQuery);

      const tagQuery = format(
        `SELECT * FROM task_tag 
        INNER JOIN tag ON task_tag.tag_id = tag.tag_id
        WHERE task_id IN (%L)`,
        taskIds
      );

      const allTags = await pool.query(tagQuery);

      response.tasks = formatTasksResponse(
        taskIds,
        tasks.rows,
        allFields.rows,
        allSkills.rows,
        allTags.rows
      );

      res.json(response);
    }
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
