const express = require("express");
const cors = require("cors");
const auth = require("./middleware/auth");
const pool = require("./database");
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

app.use("/auth", require("./routes/auth"));
