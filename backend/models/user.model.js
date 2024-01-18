const mongoose = require("mongoose");

const connection = require("../config/userConnection");
const { ObjectId } = require("mongodb");

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: false,
  },
  readChapters: {
    type: [Number],
    required: false,
  },
  comments: {
    type: [ObjectId],
    required: false,
  },
  reviews: {
    type: [ObjectId],
    required: false,
  },
});

const users = connection.model("User", userScheme);

module.exports = users
