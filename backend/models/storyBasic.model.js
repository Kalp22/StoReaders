const mongoose = require("mongoose");

const connection = require("../config/storiesConnection");

const storyBasicScheme = new mongoose.Schema({
  storyName: {
    type: String,
    required: true,
  },
  totalNumberOfChapters: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const StoryBasics = connection.model("StoryBasic", storyBasicScheme);

module.exports = StoryBasics;
