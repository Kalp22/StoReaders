const express = require("express");
const router = express.Router();
// Chapters model
const Chapters = require("../models/chapters.model");
//User model
const Users = require("../models/user.model");
//Story model
const Stories = require("../models/storyDetail.model");

const nodemailer = require("nodemailer");

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
    const chapter = await Chapters.findOne({ chapterName }).exec();

    if (!userId) {
      res.status(200).json({ status: true, chapter: chapter });
      return;
    }

    const user = await Users.findById(userId);

    // Check if user has already read the story
    const hasReadStory = user.readStories.some(
      (story) => story.storyId === chapter.storyId
    );

    if (!hasReadStory) {
      // Increment views and add story to user's readStories
      await Stories.findByIdAndUpdate(chapter.storyId, {
        $inc: { views: 1 },
      });

      user.readStories.push({
        storyId: chapter.storyId,
        noOfChapters: 1,
      });
    }

    // Check if user has already read the chapter
    const hasReadChapter = user.readChapters.includes(chapter._id);

    if (!hasReadChapter) {
      // Add chapter to user's readChapters
      user.readChapters.push(chapter._id);
    }

    // Save the user document
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

// Send email to all users when a new chapter is added
const sendEmail = async (storyName, chapterName) => {
  const users = await Users.find().exec();

  const storyRoute = encodeURIComponent(storyName);

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  const emailHTML = `
    <h1 style="font-size: 24px; font-weight: bold; color: #333;">New Chapter Alert!</h1>
    <p style="font-size: 16px; line-height: 1.5;">A new chapter <strong>${chapterName}</strong> has just been released for the story <strong>${storyName}</strong></p>
    <p style="font-size: 16px; line-height: 1.5;"><em>Don't miss out!</em></p>
    <p style="font-size: 16px; line-height: 1.5;">Click <a href="${process.env.BASE_URL}/story/${storyRoute}" style="color: #007bff; text-decoration: none;">here</a> to read the new chapter</p>
    <p style="font-family: 'Arial'; color: #333;"><a href="${process.env.BASE_URL}">Storeaders</a></p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    bcc: users.map((user) => user.email),
    subject: "New Chapter Alert! 📚",
    html: emailHTML,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

router.post("/add", async (req, res) => {
  try {
    const { storyId, storyName, chapterNumber, chapterName, chapterContent } =
      req.body;
    const releaseDate = new Date().toJSON();

    // Increment noOfChapters directly in the database
    const updatedStory = await Stories.findOneAndUpdate(
      { _id: storyId },
      { $inc: { "storyBasic.totalNumberOfChapters": 1 } },
      { new: true } // To return the updated document
    );

    if (!updatedStory) {
      return res.status(404).json({ message: "Story not found" });
    }

    const newChapter = new Chapters({
      storyId,
      storyName,
      chapterNumber,
      chapterName,
      releaseDate,
      chapterContent,
    });

    await newChapter.save();

    // Send email to all users
    await sendEmail(storyName, chapterName);

    res.status(201).json({
      status: true,
      message: "Chapter added successfully",
      id: newChapter._id,
      storyId: storyId,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
