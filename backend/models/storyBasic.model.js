const mongoose = require("mongoose");

const storyBasicScheme = new mongoose.Schema({
    storyName: {
        type: String,
        required: true,
    },
    totalNumberOfChapters: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model("StoryBasic", storyBasicScheme);