const mongoose = require("mongoose");

const db = "/Stories";

const storiesConnection = mongoose.createConnection(
  `${process.env.DB_ADD}${db}?retryWrites=true&w=majority`
);

module.exports = storiesConnection;
