const express = require("express");
const router = express.Router();
//for .env file
require("dotenv").config();
//for password hashing and token generation
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authServer.middleware");
//for database connection
const mongoose = require("mongoose");
//for sending otp
const nodemailer = require("nodemailer");
//User model
const User = require("../models/user.model");

//Database connection
const db = "/Accounts";
mongoose.connect(`${process.env.DB_ADD}${db}?retryWrites=true&w=majority`);

/*
 *@route PUT /api/user/sendotp
 */

router.put("/sendotp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      res.status(400).json({ status: false, msg: "Email not provided" });

    //Finding and storing collection with "username"
    const user = await User.findOne({ email });

    if (!user) res.status(400).json({ status: false, msg: "No User found" });

    //Generating otp
    const otp = Math.floor(Math.random() * 1000000);

    //Updating otp
    user.otp = otp;
    await user.save();

    const expiry = new setTimeout(function () {
      user.otp = null;
      user.save();
    }, 120000);

    // OTP expires in 2 minutes
    expiry;

    //Sending otp
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    //Creating mail
    var mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: "Your OTP to change password",
      text:
        "Your OTP is " +
        otp +
        ".\nPlease do not share it with anyone.\n\nDo not reply to this mail.",
    };

    //Sending mail
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({ status: true, msg: "OTP sent" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: e.message });
  }
});

/*
 *@route PUT /api/user/checkotp
 */

router.put("/checkotp", async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (!otp) res.status(400).json({ status: false, msg: "OTP not provided" });

    //Finding and storing collection with "username"
    const user = await User.findOne({ email: email });

    if (!user) res.status(400).json({ status: false, msg: "No User found" });

    //Checking otp
    if (otp == user.otp) {
      user.otp = null;
      await user.save();
      res.status(200).json({ status: true, id: user._id, msg: "OTP verified" });
    } else {
      res.status(400).json({ status: false, msg: "OTP not verified" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: e.message });
  }
});

/*
 *@route PUT /api/user/resetpassword
 */

router.put("/resetpassword", async (req, res) => {
  try {
    const { password, id } = req.body;

    if (!password)
      res.status(400).json({ status: false, msg: "Password not provided" });

    //Finding and storing collection with "username"
    const user = await User.findById(id);

    if (!user) res.status(400).json({ status: false, msg: "No User found" });

    //Hashing password
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;

    //Updating password
    await user.save();

    res
      .status(200)
      .json({ status: true, msg: "Password changed Successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: e.message });
  }
});

module.exports = router;
