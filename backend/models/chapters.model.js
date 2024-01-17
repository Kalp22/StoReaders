const mongoose = require("mongoose");

const ChapterComments = require("./chapterComments.model");

const connection = require("../config/chaptersConnection");

const chapterScheme = new mongoose.Schema({
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
  comments: {
    type: [ChapterComments.schema],
    required: false,
  },
});

const Chapters = connection.model("Chapter", chapterScheme);

module.exports = Chapters;
