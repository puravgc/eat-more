const User = require("../models/UserModel");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    //Fetch Data from frontend
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(400).json({ message: "Please provide email and password" }); 
    }

    //check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User doesnt exists. Please Signup" });
    }
    //check if password is correct
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Credentials" });
    }
    //if everything is fine, return JWT token
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token: token, success: true, message: "Login Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
