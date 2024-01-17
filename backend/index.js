//Connecting to express
const express = require("express");
const app = express();

//Use Cors
const cors = require("cors");
app.use(cors());

//Use JSON
app.use(express.json());

//env file config
require("dotenv").config();

//Routing Paths
const users = require("./api/user.controller");
const frogotPassword = require("./api/forgotPassword");

const stories = require("./api/stories.controller");

const chapters = require("./api/chapters.controller");
const comments = require("./api/comments.controller");

//Using routed Paths
app.use("/user", users);
app.use("/user", frogotPassword);

app.use("/stories", stories);

app.use("/chapters", chapters);
app.use("/comments", comments);

//Server port
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
