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
const users = require("./api/user");
const frogotPassword = require("./api/forgotPassword");

const stories = require("./api/stories.js");

const paraAdd = require("./api/paraAdd");

const read = require("./api/read");

//Using routed Paths
app.use("/user", users);
app.use("/user", frogotPassword);

app.use("/stories", stories);

app.use("/editChapter", paraAdd);

app.use("/read", read);

//Server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
