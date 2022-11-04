const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

app.use("/auth", require("./routes/auth"));
app.use("/project", require("./routes/project"));
