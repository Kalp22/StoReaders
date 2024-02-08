const mongoose = require("mongoose");

const commentReplies = require("./commentReply.model");

const connection = require("../config/chaptersConnection");
const { ObjectId } = require("mongodb");

const chapterCommentsScheme = new mongoose.Schema({
  chapterId: {
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
  replyId: {
    type: [String],
    required: false,
  },
});

const ChapterComments = connection.model(
  "ChapterComments",
  chapterCommentsScheme
);

module.exports = ChapterComments;
