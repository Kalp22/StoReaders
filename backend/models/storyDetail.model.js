const mongoose = require("mongoose");

const StoryBasic = require("./storyBasic.model");

const connection = require("../config/storiesConnection");
const { ObjectId } = require("mongodb");

const storyDetailScheme = new mongoose.Schema({
  storyBasic: {
    type: StoryBasic.schema,
    required: true,
  },
  storyDescription: {
    type: String,
    required: true,
  },
  imageId: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  noOfRatings: {
    type: Number,
    required: true,
  },
  reviewId: {
    type: [ObjectId],
    required: false,
  },
});

const storyDetails = connection.model("StoryDetail", storyDetailScheme);

module.exports = storyDetails;
