const express = require("express");
const router = express.Router();

const auth = require("../middleware/authServer.middleware");

// Chapters model
const Chapters = require("../models/chapters.model");
// User model
const User = require("../models/user.model");
// Comment model
const Comment = require("../models/chapterComments.model");
//Reply model
const Reply = require("../models/commentReply.model");

/*
 *@route POST /api/comments/getAll
 */

router.post("/getAll", async (req, res) => {
  try {
    const { chapterId, pageNumber } = req.body;
    const pageSize = 10; // number of comments per page
    const skip = (pageNumber - 1) * pageSize; // number of documents to skip
    console.log("pageNumber", pageNumber);
    const totalComments = await Comment.countDocuments({
      chapterId: chapterId,
    });
    const totalPages = Math.ceil(totalComments / pageSize);

    const comments = await Comment.find({ chapterId: chapterId })
      .sort({ dateAdded: 1 })
      .skip(skip)
      .limit(pageSize)
      .exec();

    const isLastPage = pageNumber >= totalPages;
    console.log("isLastPage", isLastPage);
    res.status(200).json({ status: true, comments, isLastPage });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route POST /api/comments/reply/getAll
 */

router.post("/reply/getAll", async (req, res) => {
  try {
    const { commentId } = req.body;
    const replies = await Reply.find({ commentId: commentId })
      .sort({ dateAdded: 1 })
      .exec();

    res.status(200).json({ status: true, replies });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route PUT /api/comments/add
 */

router.put("/add", async (req, res) => {
  try {
    //Credentials from user taken
    const { userId, chapterId, content } = req.body;

    //Find commentator
    const commentor = await User.findById(userId).exec();
    //Find chapter
    const comment = new Comment({
      chapterId: chapterId,
      commentator: commentor.username,
      dateAdded: new Date().toJSON(),
      commentContent: content,
    });

    const chapter = await Chapters.findById(chapterId).exec();

    //Get comment Id by getting the last Object in comments Array
    const commentId = comment._id.toString();

    //Push comment to Chapter
    await chapter.updateOne({ $push: { commentId: commentId } });
    //Add comment id to user comments Array
    await commentor.updateOne({ $push: { comments: commentId } });

    await comment.save();
    await chapter.save();
    await commentor.save();

    res.status(201).json({ status: true, updatedComment: comment });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route PUT /api/comments/reply/add
 */

router.put("/reply/add", async (req, res) => {
  try {
    const { userId, commentId, content } = req.body;

    //Find commentator
    const commentor = await User.findById(userId).exec();

    //Find Reply
    const reply = new Reply({
      commentId: commentId,
      commentator: commentor.username,
      dateAdded: new Date().toJSON(),
      commentContent: content,
    });

    // const comment = await Comment.findById(commentId).exec();

    const replyId = reply._id.toString();

    //Push reply to Comment
    await Comment.findByIdAndUpdate(commentId, {
      $push: { replyId: replyId },
    }).exec();

    //Add reply id to user replies Array
    await User.findByIdAndUpdate(userId, {
      $push: { replies: replyId },
    }).exec();

    await reply.save();

    res.status(201).json({ status: true, updatedReply: reply });
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
    const { userId, commentId, replyId } = req.body;

    //Remove reply from user replies Array
    if (
      !(await User.findByIdAndUpdate(userId, {
        $pull: { replies: replyId },
      }).exec())
    ) {
      res
        .status(401)
        .json({ message: "You are Unauthorized to delete this Reply" });
      return;
    }
    //Remove reply from comment replies Array
    await Comment.findByIdAndUpdate(commentId, {
      $pull: { replyId: replyId },
    }).exec();

    //Delete reply
    await Reply.findByIdAndDelete(replyId).exec();

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

    if (
      !(await User.findByIdAndUpdate(userId, {
        $pull: { comments: commentId },
      }).exec())
    ) {
      res
        .status(401)
        .json({ message: "You are Unauthorized to delete this Comment" });
      return;
    }
    //Remove comment from chapter comments Array
    await Chapters.findByIdAndUpdate(chapterId, {
      $pull: { commentId: commentId },
    }).exec();

    //Delete comment replies
    const comment = await Comment.findById(commentId).exec();
    const replies = comment.replyId.length != 0 && comment.replyId;
    if (replies.length !== 0) {
      for (let i = 0; i < replies.length; i++) {
        const reply = await Reply.findById(replies[i]).exec();
        //Remove reply from user replies Array
        await User.findOneAndUpdate(
          { username: reply.commentator },
          {
            $pull: { replies: replies[i] },
          }
        ).exec();
        //Delete reply
        await Reply.findByIdAndDelete(replies[i]).exec();
      }
    }

    //Delete comment
    await Comment.findByIdAndDelete(commentId).exec();

    res
      .status(201)
      .json({ status: true, message: "Comment deleted", commentId: commentId });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
