const express = require("express");
const router = express.Router();
//Story model
const StoryDetail = require("../models/storyDetail.model");

/*
 *@route GET /api/stories/getAll
 */

router.get("/getAll", async (req, res) => {
  try {
    const stories = await StoryDetail.find().exec();
    const storyBasicInfo = stories.map((story) => {
      return {
        storyId: story._id,
        storyName: story.storyBasic.storyName,
        totalNumberOfChapters: story.storyBasic.totalNumberOfChapters,
        status: story.storyBasic.status,
        description: story.storyDescription,
      };
    });
    res.status(200).json({ status: true, storyBasicInfo });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route GET /api/stories/get
 */

router.get("/get", async (req, res) => {
  try {
    const storyId = req.body.storyId;

    const story = await StoryDetail.findById(storyId);

    res.status(200).json({ status: true, story });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route POST /api/stories/add
 */

router.post("/add", async (req, res) => {
  try {
    const { storyName, storyDescription, genre } = req.body;

    const totalNumberOfChapters = 0;
    const views = 0;
    const status = true;
    const ratings = 0;
    const noOfRatings = 0;

    const newStory = new StoryDetail({
      storyBasic: {
        storyName,
        totalNumberOfChapters,
        status,
      },
      storyDescription,
      genre,
      views,
      ratings,
      noOfRatings,
    });

    await newStory.save();

    res.status(201).json({ status: true, message: "Story added successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
