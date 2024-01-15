//Connecting to express route
const express = require("express");
const router = express.Router();

//env config
require("dotenv").config();

//Connecting to mongodb server using URL
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DB_ADD);

router.get('/',async(req,res)=>{
   
})

//Route for getting chapter
router.get("/Chapter", async (req, res) => {
  try {
    //required data fetched from frontend
    const { arcName, chapterName } = req.body;

    //connecting to database
    await client.connect();
    const db = client.db(arcName);

    const theChapter = db.collection(chapterName);

    const chapterArray = await db.collection(chapterName).aggregate().toArray();

    if (chapterArray.length === 0) {
      res.status(200).json({ status: true, isChapter: false, chapter: 0 });
    } else {
      res
        .status(200)
        .json({ status: true, isChapter: true, chapter: chapterArray });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
