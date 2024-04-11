require("dotenv").config();

const express = require("express");
const router = express.Router();

const auth = require("../middleware/authServer.middleware");

//Story model
const StoryDetail = require("../models/storyDetail.model");
//User model
const User = require("../models/user.model");

const nodemailer = require("nodemailer");

const { google } = require("googleapis");

// Get Cover Image of each or specific story from Google Drive
async function getImageFromGoogleDrive() {
  // Credentials for Google Drive API
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const redirect_uris = process.env.REDIRECT_URIS;

  // Create an OAuth2 client object from the credentials
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris
  );

  // Set the credentials for the OAuth2 client
  oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  // Create a new instance of Google Drive
  const drive = google.drive({
    version: "v3",
    auth: oAuth2Client,
  });

  // Retrieve the metadata as a JSON object
  const response = await drive.files.list({
    q: "mimeType='image/jpeg' or mimeType='image/png' or mimeType='image/jpg'",
    fields: "files(id, name, webViewLink)",
  });

  return response;
}

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
        imageId: story.imageId,
        genre: story.genre,
      };
    });

    const imagesResponse = await getImageFromGoogleDrive();

    const filteredResponse = storyBasicInfo.map((story) => {
      return imagesResponse.data.files.map((file, i) => {
        if (story.imageId == file.id) {
          return file.webViewLink;
        }
      });
    });

    const nestedResponse = filteredResponse.map((item) => {
      return item.filter((item) => {
        return item != undefined;
      });
    });

    const finalResponse = nestedResponse.map((item) => {
      return item[0];
    });

    res
      .status(200)
      .json({ status: true, story: storyBasicInfo, dataURI: finalResponse });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route POST /api/stories/get
 */

router.post("/get", async (req, res) => {
  try {
    const storyName = req.body.storyName;

    const story = await StoryDetail.findOne({
      "storyBasic.storyName": storyName,
    });

    if (!story) {
      return res
        .status(404)
        .json({ status: false, message: "Story not found" });
    }

    const imagesResponse = await getImageFromGoogleDrive();

    const filterdResponse = imagesResponse.data.files.map((file, i) => {
      if (story.imageId == file.id) {
        return file.webViewLink;
      }
    });

    const finalResponse = filterdResponse.filter((item) => {
      return item != undefined;
    });

    res.status(200).json({
      status: true,
      story: story,
      dataURI: finalResponse,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route GET /api/stories/getLatest
 */

router.get("/getLatest", async (req, res) => {
  try {
    const latestStory = await StoryDetail.findOne().sort({ _id: -1 }).exec();

    if (!latestStory) {
      return res
        .status(404)
        .json({ status: false, message: "Story not found" });
    }

    res.status(200).json({
      status: true,
      storyName: latestStory.storyBasic.storyName,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route POST /api/stories/getReadStories
 */

router.post("/getReadStories", auth, async (req, res) => {
  try {
    const { storyIds } = req.body;
    const stories = await StoryDetail.find({ _id: { $in: storyIds } }).exec();
    const storiesBasicInfo = stories.map((story) => {
      return {
        storyId: story._id,
        storyName: story.storyBasic.storyName,
        totalNumberOfChapters: story.storyBasic.totalNumberOfChapters,
        status: story.storyBasic.status,
      };
    });
    res.status(200).json({ status: true, stories: storiesBasicInfo });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route POST /api/stories/add
 */

const notifyUsers = async (storyName, storyDescription) => {
  const users = await User.find().exec();

  const emails = users.map((user) => {
    return user.email;
  });
  const storyRoute = encodeURIComponent(storyName);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const emailHTML = `
    <div style="background-color: #f5f5f5; padding: 20px;">
      <div style="background-color: white; padding: 20px; border-radius: 10px;">
        <h1 style="font-family: 'Arial'; color: #333;">Get Ready for an Adventure! 📚</h1>
        <p style="font-family: 'Arial'; color: #333;">Exciting news! We've just added a brand new story to our collection, and we think you're going to love it!</p>
        <p style="font-family: 'Arial'; color: #333;">Titled "<strong>${storyName}</strong>",</p>
        <p style="font-family: 'Arial'; color: #333;">${storyDescription.slice(
          0,
          150
        )}...</p>
        <p style="font-family: 'Arial'; color: #333;">Ready to start reading? Click <a href="https://storeaders.vercel.app/story/${storyRoute}">here</a> to dive into the adventure right away!</p>
        <p style="font-family: 'Arial'; color: #333;">Don't miss out on this exciting new addition. Happy reading!</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: emails,
    subject: "Get Ready for an Adventure! 📚",
    html: emailHTML,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Story notified: " + info.response);
    }
  });
};

router.post("/add", async (req, res) => {
  try {
    const { storyName, storyDescription, genre, imageId } = req.body;

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
      imageId,
      genre,
      views,
      ratings,
      noOfRatings,
    });

    await notifyUsers(storyName, storyDescription);

    await newStory.save();

    res.status(201).json({
      status: true,
      id: newStory._id,
      message: "Story added successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
