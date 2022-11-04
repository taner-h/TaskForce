const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../database");
const generateJWT = require("../utils/generateJWT");
const validInfo = require("../middleware/validInfo");
const auth = require("../middleware/auth");
const constants = require("../data/constants");

//register
router.post("/register", validInfo, async (req, res) => {
  try {
    //destruct the req.body
    const { email, password, name, surname } = req.body;

    // make sure the email is not in use
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json("Email is already in use.");
    }

    // hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // generate other non-null attributes
    const creditCount = constants.INITIAL_CREDIT_COUNT;
    const createTime = new Date(Date.now()).toISOString();
    const subTierId = 1; // Free account as default

    // insert user into database
    const newUser = await pool.query(
      `INSERT INTO users (email, password, name, surname, credit_count,
      create_time, sub_tier_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [email, hashedPassword, name, surname, creditCount, createTime, subTierId]
    );

    // generating web token
    const token = generateJWT(newUser.rows[0].user_id);
    const userID = newUser.rows[0].user_id;

    res.json({ token, userID });
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    // deconstruct the req.body
    const { email, password } = req.body;

    // check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or email is incorrect.");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json("Password or email is incorrect.");
    }

    const token = generateJWT(user.rows[0].user_id);
    const userId = user.rows[0].user_id;
    res.json({ token, userId });
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/verify", auth, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
