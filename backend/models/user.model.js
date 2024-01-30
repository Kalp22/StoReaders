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
  readStories: {
    type: [{ storyId: ObjectId, noOfChapters: Number }],
    required: false,
  },
  readChapters: {
    type: [ObjectId],
    required: false,
  },
  comments: {
    type: [ObjectId],
    required: false,
  },
  replies: {
    type: [ObjectId],
    required: false,
  },
  reviews: {
    type: [{ storyId: ObjectId, reviewId: ObjectId }],
    required: false,
  },
  ratings: {
    type: [{ storyId: String, rating: Number }],
    required: false,
  },
});

const users = connection.model("User", userScheme);

module.exports = users;
