const express = require("express");
const router = express.Router();

const auth = require("../middleware/authServer.middleware");

// Chapters model
const Chapters = require("../models/chapters.model");
// User model
const User = require("../models/user.model");

/*
 *@route POST /api/comments/add
 */

router.put("/add", async (req, res) => {
  try {
    //Credentials from user taken
    const { userId, chapterId, content } = req.body;

    //Date added
    const dateAdded = new Date().toJSON().slice(0, 10);
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

    res.status(201).json({ status: true, updatedChapter: chapter });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
