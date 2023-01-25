const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");

// middleware
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));
}

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

app.use("/auth", require("./routes/auth"));
app.use("/project", require("./routes/project"));
app.use("/user", require("./routes/user"));
app.use("/field", require("./routes/field"));
app.use("/skill", require("./routes/skill"));
app.use("/tag", require("./routes/tag"));
app.use("/application", require("./routes/application"));
app.use("/member", require("./routes/member"));
app.use("/invite", require("./routes/invite"));
app.use("/task", require("./routes/task"));
app.use("/commit", require("./routes/commit"));
app.use("/answer", require("./routes/answer"));
app.use("/notification", require("./routes/notification"));

if (process.env.NODE_ENV === "production") {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
  });
}
