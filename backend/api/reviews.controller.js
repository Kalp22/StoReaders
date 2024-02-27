const express = require("express");
const router = express.Router();

const auth = require("../middleware/authServer.middleware");

// Chapters model
const Story = require("../models/storyDetail.model");
// User model
const User = require("../models/user.model");
// Review model
const Review = require("../models/reviews.model");

/*
 *@route GET /api/reviews/get
 */

router.post("/getAll", async (req, res) => {
  try {
    const { storyName } = req.body;
    const reviews = await Review.find({ storyName }).exec();
    res.status(200).json({ status: true, reviews: reviews });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route GET /api/reviews/getUserReviews
 */

router.post("/getUserReviews", auth, async (req, res) => {
  try {
    const { reviewIds } = req.body;
    if (reviewIds.length === 0)
      return res.status(200).json({ status: true, reviews: [] });
    const reviews = await Review.find({ _id: { $in: reviewIds } }).exec();

    res.status(200).json({ status: true, reviews: reviews });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route PUT /api/reviews/add
 */

router.put("/add", auth, async (req, res) => {
  try {
    // Credentials from user taken
    const { userId, storyId, storyName, content } = req.body;

    const user = await User.findById(userId).exec();

    // Check if the user has already reviewed the story
    const hasReviewed = user.reviews.find(
      (review) => review.storyId === storyId
    );

    if (hasReviewed) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this story" });
    } else {
      // Create new review
      const newReview = new Review({
        storyId,
        storyName,
        reviewer: user.username,
        reviewDate: new Date().toJSON(),
        reviewContent: content,
      });

      // Save review
      await newReview.save();

      // Add review to user reviews array
      await User.findByIdAndUpdate(userId, {
        $push: { reviews: { storyId: storyId, reviewId: newReview._id } },
      }).exec();

      // Add review to story reviews array
      await Story.findByIdAndUpdate(storyId, {
        $push: { reviewId: newReview._id },
      }).exec();

      res
        .status(201)
        .json({ status: true, message: "Review added", newReview: newReview });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route DELETE /api/reviews/delete
 */

router.delete("/delete", auth, async (req, res) => {
  try {
    //Credentials from user taken
    const { userId, storyId, reviewId } = req.body;

    //Delete review
    await Review.findByIdAndDelete(reviewId).exec();

    //Remove review from user reviews Array
    await User.findByIdAndUpdate(userId, {
      $pull: { reviews: { storyId: storyId, reviewId: reviewId } },
    }).exec();

    //Remove review from story reviews Array
    await Story.findByIdAndUpdate(storyId, {
      $pull: { reviewId: reviewId },
    }).exec();

    res
      .status(201)
      .json({ status: true, message: "Review deleted", reviewId: reviewId });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
