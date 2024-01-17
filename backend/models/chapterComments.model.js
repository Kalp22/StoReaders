const mongoose = require("mongoose");

const connection = require("../config/chaptersConnection");

const chapterCommentsScheme = new mongoose.Schema({
  commentator: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    required: true,
  },
  commentContent: {
    type: String,
    required: true,
  },
});

const ChapterComments = connection.model(
  "ChapterComments",
  chapterCommentsScheme
);

module.exports = ChapterComments;
