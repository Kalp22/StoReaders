const mongoose = require("mongoose");

const connection = require("../config/storiesConnection");

const reviewScheme = new mongoose.Schema({
  reviewer: {
    type: String,
    required: true,
  },
  reviewDate: {
    type: Date,
    required: true,
  },
  reviewContent: {
    type: String,
    required: true,
  },
});

const Review = connection.model("Review", reviewScheme);

module.exports = Review;
