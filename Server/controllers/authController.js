const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/userModel");

const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
      // res.json({ message : 'Validation failed'})
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const userType = req.body.userType;
    const joinedDate = new Date();
    const isAdmin = false;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      joinedDate,
      userType,
      isAdmin,
    });

    const result = await user.save();

    res
      .status(200)
      .json({ message: "User is created successfully !", user: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error("A user with this email could not be found !!!");
      error.statusCode = 401;
      throw error;
    }

    const isEqualPass = await bcrypt.compare(password, user.password);

    if (!isEqualPass) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }
    // attach token and send to client
    const token = jwt.sign(
      {
        email: email,
        userId: user._id.toString(),
        userType: user.userType,
      },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, userInfo: user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error("User not found !!!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: email,
        userId: user._id.toString(),
        userType: user.userType,
      },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: 'smtp.gmail.com',
      port: 465,
      secure: false,
      auth: {
        user: process.env.AUTH_NODEMAILER_USER,
        pass: process.env.AUTH_NODEMAILER_PASS,
      },
    });
  
    const newPassword = Math.random().toString(36).substring(2,8);
    const mailOptions = {
      from: process.env.AUTH_NODEMAILER_USER,
      to: email,
      subject: "Reset Password Link",
      text: 'New Password: ' + newPassword,
    };

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword
    await user.save();

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ Status: "Success", info });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    const { password } = req.body;

    const decodedPayload = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    if (!decodedPayload) {
      const error = new Error("Error with token");
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: userId }, { password: hashedPassword });

    res.status(200).json({ Status: "Success" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
};
