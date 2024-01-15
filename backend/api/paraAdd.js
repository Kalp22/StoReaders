const express = require("express");
const router = express.Router();

require("dotenv").config();

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DB_ADD);

router.post("/", async (req, res) => {
  try {
    const { arcName, chapterName, data } = req.body;

    await client.connect();

    const db = client.db(arcName.toString());

    const theChapter = db.collection(chapterName.toString());

    //Inserting data to db
    if (await theChapter.insertOne({ data })) {
      res.status(200).json({ status: true });
    } else {
      res.status(400).json({ status: false });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

module.exports = router;
