const User = require("../models/userModel");

const getProfile = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found !!");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // Server error
    }
    next(err);
  }
};

const addProfile = async (req, res, next) => {
  try {
    const userId = req.userId;

    const { fullname, dateOfBirth, phoneNumber } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found !!");
      error.statusCode = 404;
      throw error;
    }

    user.fullname = fullname;
    user.dateOfBirth = dateOfBirth;
    user.phoneNumber = phoneNumber;

    await user.save();
    res.status(200).json({
      message : "User sign in successfully !!!",
      user
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // Server error
    }
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.userId;

    const { fullname, dateOfBirth, phoneNumber, email } = req.body;
    const avatar = req.body.image;

    if (req.file) {
      avatar = req.file.path.replace("\\", "/");
    }
    const user = await User.findById(userId);

    if (!user){
      const error = new Error("User not found !!");
      error.statusCode = 404;
      throw error;
    }

    user.fullname = fullname;
    user.email = email;
    user.avatar = avatar;
    user.dateOfBirth = dateOfBirth;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).json({
      message : "Update user successfully !!!",
      user
    })
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // Server error
    }
    next(err);
  }
};

module.exports = {
  getProfile,
  addProfile,
  updateProfile,
};
