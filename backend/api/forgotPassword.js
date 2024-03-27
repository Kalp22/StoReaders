const express = require("express");
const router = express.Router();
//for .env file
require("dotenv").config();
//for password hashing
const bcrypt = require("bcrypt");
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

    if (!email) {
      res.status(400).json({ status: false, msg: "Email not provided" });
      return;
    }

    if (email === "[deleted]") {
      res.status(400).json({ status: false, msg: "Invalid credentials" });
      return;
    }

    if (email.includes(" ") || !(email.includes("@") && email.includes("."))) {
      res.status(400).json({ status: false, msg: "Invalid Email" });
      return;
    }

    const mail = email.toLowerCase();

    //Finding and storing collection with "username"
    const user = await User.findOne({ email: mail });

    if (!user) {
      res.status(400).json({ status: false, msg: "No User found" });
      return;
    }

    //Generating otp
    const otp = Math.floor(Math.random() * 1000000);

    //Updating otp
    user.otp = otp;
    await user.save();

    const expiry = new setTimeout(async function () {
      user.otp = null;
      await user.save();
    }, 300000);

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

    if (!otp) {
      res.status(400).json({ status: false, msg: "OTP not provided" });
      return;
    }

    if (!email) {
      res.status(400).json({ status: false, msg: "Email not provided" });
      return;
    }

    if (email === "[deleted]") {
      res.status(400).json({ status: false, msg: "Invalid credentials" });
      return;
    }

    const mail = email.toLowerCase();

    //Finding and storing collection with "username"
    const user = await User.findOne({ email: mail });

    if (!user) {
      res.status(400).json({ status: false, msg: "No User found" });
      return;
    }

    //Checking otp
    if (otp === user.otp) {
      user.otp = null;
      await user.save();
      res
        .status(200)
        .json({ status: true, id: user._id, msg: "OTP verified successfully" });
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

    if (password === "[deleted]") {
      res.status(400).json({ status: false, msg: "Invalid credentials" });
      return;
    }

    if (!password) {
      res.status(400).json({ status: false, msg: "Password not provided" });
      return;
    }

    //Finding and storing collection with "username"
    const user = await User.findById(id);

    if (!user) {
      res.status(400).json({ status: false, msg: "No User found" });
      return;
    }

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
