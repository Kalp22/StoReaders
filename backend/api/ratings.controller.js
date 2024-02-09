const express = require("express");
const router = express.Router();

// User model
const Users = require("../models/user.model");
// Story model
const Stories = require("../models/storyDetail.model");

/*
 * @route   PUT api/ratings
 */

router.put("/", async (req, res) => {
  try {
    // Credentials from request body
    const { userId, storyId, rating } = req.body;

    // Find user
    const user = await Users.findById(userId);

    const allRatings = user.ratings;

    // Check if user has already rated the story
    const existingRatingIndex = allRatings.findIndex((rating) => {
      // Convert the storyId to a string for comparison
      return rating.storyId.toString() === storyId.toString();
    });

    if (existingRatingIndex !== -1) {
      // User has already rated the story
      const previousRating = allRatings[existingRatingIndex].rating;

      allRatings[existingRatingIndex].rating = rating;

      const story = await Stories.findById(storyId);

      story.ratings = story.ratings - previousRating + rating;

      await story.save();
    } else {
      // User is rating the story for the first time
      user.ratings.push({ storyId: storyId, rating: rating });

      const story = await Stories.findById(storyId);

      story.noOfRatings++;
      story.ratings = story.ratings + rating;

      await story.save();
    }

    await user.save();

    res.status(200).json({ status: true, msg: "Rating added" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
