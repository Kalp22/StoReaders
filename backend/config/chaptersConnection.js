const mongoose = require("mongoose");

const db = "/Chapters";
const userConnection = mongoose.createConnection(
  `${process.env.DB_ADD}${db}?retryWrites=true&w=majority`
);

module.exports = userConnection;
