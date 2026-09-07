const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectdb = require("./config/db");
const path = require("path");


dotenv.config();

connectdb();

const app = express();

//midddlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "frontend")));

app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authroutes"));
app.use("/api/v1/user", require("./routes/userroutes"));
app.use("/api/v1/task", require("./routes/taskroute"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend","index.html"));
});

// app.get("/", (req, res) => {
//   return res.status(200).send("<h1>Welcome to the food server,hello!</h1>");
// });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`.bgRed);
});
