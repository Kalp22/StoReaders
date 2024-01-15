const mongoose = require("mongoose");

const chapterCommentsScheme = new mongoose.Schema({
  commentId: {
    type: String,
    required: true,
  },
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

module.exports = mongoose.model("ChapterComments", chapterCommentsScheme);
