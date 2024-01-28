const express = require("express");
const router = express.Router();

const auth = require("../middleware/authServer.middleware");

// Chapters model
const Chapters = require("../models/chapters.model");
// User model
const User = require("../models/user.model");

/*
 *@route PUT /api/comments/add
 */

router.put("/add", auth, async (req, res) => {
  try {
    //Credentials from user taken
    const { userId, chapterId, content } = req.body;

    //Date added
    const dateAdded = new Date().toJSON();
    //Find commentator
    const commentor = await User.findById(userId).exec();
    const commentatorName = commentor.username;

    //Find chapter
    const chapter = await Chapters.findById(chapterId).exec();
    //Push comment to Chapter
    chapter.comments.push({
      commentator: commentatorName,
      dateAdded: dateAdded,
      commentContent: content,
    });

    //Get comment Id by getting the last Object in comments Array
    const updatedComment = chapter.comments.at(-1);
    const commentId = updatedComment._id;

    //Add comment id to user comments Array
    commentor.comments.push(commentId);

    await chapter.save();
    await commentor.save();

    res.status(201).json({ status: true, updatedComment: updatedComment });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route PUT /api/comments/reply/add
 */

router.put("/reply/add", auth, async (req, res) => {
  try {
    const { userId, chapterId, commentId, content } = req.body;

    //Date added
    const dateAdded = new Date().toJSON();
    //Find commentator
    const commentor = await User.findById(userId).exec();
    const commentatorName = commentor.username;

    //Find chapter
    const chapter = await Chapters.findById(chapterId).exec();
    //Find comment
    const comment = chapter.comments.id(commentId);
    //Push reply to Comment
    comment.replies.push({
      commentator: commentatorName,
      dateAdded: dateAdded,
      commentContent: content,
    });

    //Get reply Id by getting the last Object in comments Array
    const updatedReply = comment.replies.at(-1);
    const replyId = updatedReply._id;

    //Add comment id to user comments Array
    commentor.replies.push(replyId);

    await chapter.save();
    await commentor.save();

    res.status(201).json({ status: true, updatedReply: updatedReply });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route DELETE /api/comments/reply/delete
 */

router.delete("/reply/delete", auth, async (req, res) => {
  try {
    const { userId, chapterId, commentId, replyId } = req.body;

    //Remove reply from user replies Array
    await User.findByIdAndUpdate(userId, {
      $pull: { replies: replyId },
    }).exec();

    //Remove reply from chapter comments Array
    const chapter = await Chapters.findById(chapterId).exec();
    const comment = chapter.comments.id(commentId);
    comment.replies.pull(replyId);

    //Save chapter
    await chapter.save();

    res
      .status(201)
      .json({ status: true, message: "Reply deleted", replyId: replyId });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route DELETE /api/comments/delete
 */

router.delete("/delete", auth, async (req, res) => {
  try {
    //Credentials from user taken
    const { userId, chapterId, commentId } = req.body;

    //Remove comment from user comments Array
    await User.findByIdAndUpdate(userId, {
      $pull: { comments: commentId },
    }).exec();

    //Remove comment from chapter comments Array
    const chapter = await Chapters.findById(chapterId).exec();
    //If comment has no replies, delete comment
    if ((chapter.comments.id(commentId).replies.length = 0))
      chapter.comments.pull(commentId);
    //Else, change comment content to "Deleted"
    else {
      chapter.comments.id(commentId).commentContent = "Deleted";
    }

    //Save chapter
    await chapter.save();

    res
      .status(201)
      .json({ status: true, message: "Comment deleted", commentId: commentId });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
