const express = require("express");
const router = express.Router();
// Chapters model
const Chapters = require("../models/chapters.model");

/*
 *@route GET /api/chapters/getAll
 */

router.get("/getAll", async (req, res) => {
  try {
    const chapters = await Chapters.find().exec();

    res.status(200).json({ chapters });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route POST /api/chapters/add
 */

router.post("/add", async (req, res) => {
  try {
    const { chapterNumber, chapterName, chapterContent } = req.body;

    const releaseDate = new Date().toJSON().slice(0, 10);

    const newChapter = new Chapters({
      chapterNumber,
      chapterName,
      releaseDate,
      chapterContent,
    });

    await newChapter.save();

    res.status(201).json({ message: "Chapter added successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
