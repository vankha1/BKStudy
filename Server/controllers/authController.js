const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      userOrigin: origin,
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
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, userId: user._id.toString() });
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
};
