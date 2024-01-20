const express = require("express");
const router = express.Router();

//User model
const Users = require("../models/user.model");
//Story model
const Stories = require("../models/storyBasic.model");

/*
 * @route   PUT api/stories/ratings
 */

router.put("/", async (req, res) => {
    try{
        //Credentials from request body
        const {userId, storyId, rating} = req.body;
        
        //Find user
        const user = await Users.findById(userId);

        //Check if user has already rated the story
        if(user.ratings.includes({storyId: storyId})){
            user.ratings.forEach(async (ratings) => {
                if(ratings.storyId === storyId){
                    
                    const previousRating = ratings.rating;

                    ratings.rating = rating;

                    const story = await Stories.findById(storyId);

                    story.ratings = story.ratings - previousRating + rating;

                    await story.save();
                }
            });
        }
        else{
            user.ratings.push({storyId: storyId, rating: rating});

            const story = await Stories.findById(storyId);

            story.noOfRatings = story.noOfRatings + 1;
            story.ratings = story.ratings + rating;

            await story.save();
        }

        await user.save();

        res.status(200).json({status: true, msg: "Rating added"});
    } catch(err){
        res.status(400).json({msg: err});
    }
});

module.exports = router;
