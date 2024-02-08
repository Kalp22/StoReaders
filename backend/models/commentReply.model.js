const mongoose = require("mongoose");

const connection = require("../config/chaptersConnection");

const commentReplyScheme = new mongoose.Schema({
  commentId:{
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

const CommentReply = connection.model("CommentReply", commentReplyScheme);

module.exports = CommentReply;
