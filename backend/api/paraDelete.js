const express = require("express");
const router = express.Router();

const { MongoClient } = require("mongodb");

require("dotenv").config();

const client = new MongoClient(process.env.DB_ADD);

router.delete("/", async (req, res) => {
  try {
    const { arcName, chapterName, id } = req.body;

    await client.connect();

    const db = client.db(arcName.toString());

    const theChapter = db.collection(chapterName);

    const chapterArray = await theChapter.aggregate().toArray();

    //checking if there is no data to delete
    if (chapterArray.length === 0) {
      res.status(200).json({ status: false, msg: "No Data" });
    } else {
      //looping to match data id
      chapterArray.map((item) => {
        if (item._id.toString() == id.toString()) {
          //deleting
          theChapter.deleteOne({ _id: item._id });
          res.status(200).json({ status: true, msg: "Successfully Deleted" });
        }
      });
      res.status(200).json({ status: true, msg: "Failed to Delete" });
    }
  } catch (error) {
    console.log(error);
    res.send("Server Error").status(500);
  }
});

module.exports = router;
