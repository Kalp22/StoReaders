const mongoose = require("mongoose");

const reviewScheme = new mongoose.Schema({
    reviewId: {
        type: String,
        required: true,
    },
    storyId: {
        type: String,
        required: true,
    },
    reviewerId: {
        type: String,
        required: true,
    },
    reviewer: {
        type: String,
        required: true,
    },
    reviewDate: {
        type: Date,
        required: true,
    },
    reviewContent: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Review", reviewScheme);