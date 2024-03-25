const mongoose = require("mongoose");

const db = "/Chapters";
const chapterConnection = mongoose.createConnection(
  `${process.env.DB_ADD}${db}?retryWrites=true&w=majority`
);

module.exports = chapterConnection;
