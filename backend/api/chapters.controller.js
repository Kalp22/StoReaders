const express = require("express");
const router = express.Router();
// Chapters model
const Chapters = require("../models/chapters.model");
//User model
const Users = require("../models/user.model");
//Story model
const Stories = require("../models/storyDetail.model");

/*
 *@route POST /api/chapters/getAll
 */

router.post("/getAll", async (req, res) => {
  try {
    const { storyId } = req.body;
    const chapters = await Chapters.find({ storyId: storyId }).exec();

    res.status(200).json({ status: true, chapters });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route POST /api/chapters/getOne
 */

router.post("/getOne", async (req, res) => {
  try {
    const { userId, chapterName } = req.body;
    const chapter = await Chapters.findOne({ chapterName: chapterName }).exec();

    const user = await Users.findById(userId);
    const story = await Stories.findById(chapter.storyId);

    //Check if user has already read the story
    if (!user.readStories.find((story) => story.storyId == chapter.storyId)) {
      //Increment views and add story to user's readStories
      story.views = story.views + 1;

      user.readStories.push({ storyId: chapter.storyId, noOfChapters: 0 });
    }

    //Check if user has already read the chapter
    if (!user.readChapters.includes(chapter._id)) {
      //add chapter to user's readChapters and increment noOfChapters in readStories
      user.readChapters.push(chapter._id);

      user.readStories.forEach((readStory) => {
        if (readStory.storyId == chapter.storyId) {
          readStory.noOfChapters = readStory.noOfChapters + 1;
        }
      });
    }
    await story.save();
    await user.save();

    res.status(200).json({ status: true, chapter: chapter });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route POST /api/chapters/add
 */

router.post("/add", async (req, res) => {
  try {
    const { storyId, storyName, chapterNumber, chapterName, chapterContent } =
      req.body;

    const releaseDate = new Date().toJSON().slice(0, 10);

    const story = await Stories.findById(storyId);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    } else {
      story.storyBasic.noOfChapters = story.storyBasic.noOfChapters + 1;

      const newChapter = new Chapters({
        storyId,
        storyName,
        chapterNumber,
        chapterName,
        releaseDate,
        chapterContent,
      });

      await story.save();
      await newChapter.save();

      res.status(201).json({ message: "Chapter added successfully" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
