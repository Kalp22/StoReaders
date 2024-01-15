const mongoose = require("mongoose");

const StoryBasic = require("./storyBasic.model");

const connection = require("../config/storiesConnection");

const storyDetailScheme = new mongoose.Schema({
  storyBasic: {
    type: StoryBasic.schema,
    required: true,
  },
  storyDescription: {
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
    required: false,
  },
  reviewId: {
    type: [String],
    required: false,
  },
});

const storyDetails = connection.model("StoryDetail", storyDetailScheme);

module.exports = storyDetails;
