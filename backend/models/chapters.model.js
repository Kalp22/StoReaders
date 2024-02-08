const mongoose = require("mongoose");

const connection = require("../config/chaptersConnection");
const { ObjectId } = require("mongodb");

const chapterScheme = new mongoose.Schema({
  storyId: {
    type: String,
    required: true,
  },
  storyName: {
    type: String,
    required: true,
  },
  chapterNumber: {
    type: Number,
    required: true,
  },
  chapterName: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  chapterContent: {
    type: String,
    required: true,
  },
  commentId: {
    type: [ObjectId],
    required: false,
  },
});

const Chapters = connection.model("Chapter", chapterScheme);

module.exports = Chapters;
