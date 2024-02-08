const express = require("express");
const router = express.Router();

const auth = require("../middleware/authServer.middleware");

// Chapters model
const Story = require("../models/storyDetail.model");
// User model
const User = require("../models/user.model");

/*
 *@route PUT /api/reviews/add
 */

router.put("/add", async (req, res) => {
  try {
    //Credentials from user taken
    const { userId, storyId, storyName, content } = req.body;

    var isReviewed;
    //Find reviewer
    const reviewer = await User.findById(userId).exec();
    const reviewerName = reviewer.username;

    //Check if user has already reviewed the story
    if (reviewer.reviews.length > 0) {
      reviewer.reviews.forEach((review) => {
        if (review.storyId == storyId) {
          isReviewed = true;
        }
      });
    } else {
      //Date added
      const reviewDate = new Date().toJSON().slice(0, 10);

      //Find story
      const story = await Story.findById(storyId).exec();
      //Push review to Story
      story.reviews.push({
        reviewer: reviewerName,
        reviewDate: reviewDate,
        reviewContent: content,
      });

      //Get review Id by getting the last Object in reviews Array
      var updatedReview = story.reviews.at(-1);
      const reviewId = updatedReview._id;

      //Add review id to user reviews Array
      reviewer.reviews.push({
        storyId: storyId,
        storyName: storyName,
        reviewId: reviewId,
      });

      await story.save();
      await reviewer.save();
    }
    res.status(201).json(
      isReviewed
        ? {
            status: false,
            message: "You have already reviewed this story!",
          }
        : { status: true, updatedReview: updatedReview }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route DELETE /api/reviews/delete
 */

router.delete("/delete", async (req, res) => {
  try {
    //Credentials from user taken
    const { userId, storyId, reviewId } = req.body;

    //Remove review from user reviews Array
    const user = await User.findById(userId).exec();
  
    user.reviews.map((review) => {
      if (review.reviewId == reviewId) {
        user.reviews.pull(review);
      }
    });

    //Remove review from story reviews Array
    const story = await Story.findById(storyId).exec();

    story.reviews.pull(reviewId);
  
    await story.save();
    //Save user
    await user.save();

    res
      .status(201)
      .json({ status: true, message: "Review deleted", reviewId: reviewId });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
