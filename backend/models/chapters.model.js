const mongoose = require("mongoose");

const ChapterComments = require("./chapterComments.model");

const chapterScheme = new mongoose.Schema({
  chapterId: {
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
  comments: {
    type: [ChapterComments.schema],
    required: false,
  },
});

module.exports = mongoose.model("Chapter", chapterScheme);