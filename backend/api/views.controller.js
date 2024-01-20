const express = require("express");
const router = express.Router();

//User model
const Users = require("../models/user.model");
//Story model
const Stories = require("../models/storyBasic.model");

/*
 * @route   PUT api/view
 */

async function checkStory(user, storyId) {
  //Check if user has already read the story
  if (!user.readStories.includes({ storyId: storyId })) {
    const story = await Stories.findById(storyId);

    //Increment views and add story to user's readStories
    story.views = story.views + 1;

    await story.save();

    user.readStories.push({ storyId: storyId, noOfChapters: 0 });

    await user.save();
  }
}

router.put("/", async (req, res) => {
  try {
    //Credentials from request body
    const { userId, storyId, chapterId } = req.body;

    const user = await Users.findById(userId);

    //Check if user has already read the story
    await checkStory(user, storyId);

    //Check if user has already read the chapter
    if (user.readChapters.includes(chapterId)) {
      res.status(400).json({ status: true, msg: "Chapter already read" });
    } else {
      //add chapter to user's readChapters and increment noOfChapters in readStories
      user.readChapters.push(chapterId);

      user.readStories.forEach((readStory) => {
        if (readStory.storyId === storyId) {
          readStory.noOfChapters = readStory.noOfChapters + 1;
        }
      });

      await user.save();

      res.status(200).json({ status: true, msg: "Chapter read" });
    }
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
