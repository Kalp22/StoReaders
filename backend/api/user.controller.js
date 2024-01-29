const express = require("express");
const router = express.Router();
//for .env file
require("dotenv").config();
//for password hashing and token generation
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authServer.middleware");

//User model
const User = require("../models/user.model");

/*
 *@route POST /api/user/register
 */

router.post("/register", async (req, res) => {
  try {
    //Credentials from user taken
    const { username, email, password } = req.body;

    //Checking if username or email already exists
    if (await User.findOne({ username, email }))
      return res
        .status(400)
        .json({ status: false, msg: "Username or Email already exists" });

    //Creating new user
    const newUser = new User({ username, email, password });

    //Hashing password
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    newUser.password = hashedPassword;

    //Saving new user
    await newUser.save();

    //Generating token
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);

    if (token) {
      res.status(201).json({
        message: "User register successfully",
        token,
        id: newUser._id,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ message: "User registration failed" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

/*
 *@route GET /api/user/login
 */

router.post("/login", async (req, res) => {
  try {
    //Credentials from user taken
    const { email, password } = req.body;

    if (!(email || password))
      return res
        .status(400)
        .json({ status: false, msg: "All fields not provided" });

    //Finding and storing collection with "username"
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ status: false, msg: "No User found" });

    //Comparing password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ status: false, msg: "Invalid Credentials" });

    //Generating token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    if (token) {
      res.status(201).json({
        message: "User login successfully",
        token,
        id: user._id,
        username: user.username,
        ratings: user.ratings,
      });
    } else {
      res.status(400).json({ message: "User login failed" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: e.message });
  }
});

/*
 *@route DELETE /api/user/delete
 */

router.delete("/delete", auth, async (req, res) => {
  try {
    //Credentials from user taken
    const { _id } = req.body;

    if (!_id)
      return res
        .status(400)
        .json({ status: false, msg: "All fields not provided" });

    //Finding and deleting collection with "_id"
    const user = await User.findByIdAndDelete(_id);

    if (!user)
      return res.status(400).json({ status: false, msg: "No User found" });

    res.status(200).json({ status: true, msg: "User deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: e.message });
  }
});

module.exports = router;
