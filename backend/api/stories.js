const express = require("express");
const router = express.Router();
//for .env file
require("dotenv").config();
//Story model
const StoryDetail = require("../models/storyDetail.model");

/*
 *@route GET /api/stories/getAll
 */

router.get("/getAll", async (req, res) => {
  try {
    const stories = await StoryDetail.find().exec();
    res.status(200).json({ stories });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route POST /api/stories/add
 */

router.post("/add", async (req, res) => {
  try {
    const {
      storyName,
      totalNumberOfChapters,
      status,
      storyDescription,
      genre,
      views,
    } = req.body;

    const newStory = new StoryDetail({
      storyBasic: {
        storyName,
        totalNumberOfChapters,
        status,
      },
      storyDescription,
      genre,
      views,
    });

    await newStory.save();

    res.status(201).json({ message: "Story added successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
