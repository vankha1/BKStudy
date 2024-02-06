const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Lesson = require("../models/lessonModel");
const Note = require("../models/noteModel");
const Order = require("../models/orderModel");

const getProfile = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate(
      "courses.courseId",
      "title imageUrl description"
    );

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

// GET /profile/:userId
const getAnotherProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate(
      "courses.courseId",
      "title description imageUrl"
    );

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
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

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found !!");
      error.statusCode = 404;
      throw error;
    }

    // if (!req.file) {
    //   const error = new Error("No image provided");
    //   error.statusCode = 422;
    //   throw error;
    // }
    if (user.googleId){
      const temp = req.file?.path.replace(/\\/g, "/").split("images");
      const imageUrl = "images" + temp ? temp[1] : "";
      user.avatar = imageUrl;
    }

    const { fullname, dateOfBirth, phoneNumber } = req.body;

    user.userType = user.userType ? user.userType : req.body.userType;
    user.fullname = fullname;
    user.dateOfBirth = dateOfBirth;
    user.phoneNumber = phoneNumber;

    await user.save();
    res.status(200).json({
      message: "User sign in successfully !!!",
      user,
    });
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

    const { fullname, dateOfBirth, phoneNumber } = req.body;
    let avatar = req.body.image;
    const temp = req.file
      ? req.file.path.replace(/\\/g, "/").split("images")
      : null;
    const imageUrl = temp ? "images" + temp[1] : null;

    if (req.file) {
      // avatar = req.file.path.replace("\\", "/");
      const temp = req.file.path.replace(/\\/g, "/").split("images");
      temp.length >= 2 ? (avatar = "images" + temp[1]) : null;
    }
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found !!");
      error.statusCode = 404;
      throw error;
    }

    user.fullname = fullname ? fullname : user.fullname;
    user.avatar = avatar ? avatar : user.avatar;
    user.dateOfBirth = dateOfBirth ? dateOfBirth : user.dateOfBirth;
    user.phoneNumber = phoneNumber ? phoneNumber : user.phoneNumber;

    await user.save();

    res.status(200).json({
      message: "Update user successfully !!!",
      user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // Server error
    }
    next(err);
  }
};

const registerCourse = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.userId;
    const course = await Course.findById(courseId);
    if (!course) {
      const error = new Error("Course not found !!");
      error.statusCode = 404;
      throw error;
    }

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found !!");
      error.statusCode = 404;
      throw error;
    }

    // user.courses.push({
    //   courseId: course._id,
    //   enrolledDate: new Date(),
    // });
    // course.numberOfStudent++;
    // await user.save();
    // await course.save();

    res.status(200).json({
      message: "Register course successfully !!!",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // Server error
    }
    next(err);
  }
};

const getCourses = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId)
      .populate({
        path: "courses.courseId",
        populate: {
          path: "createdBy",
          select: "fullname",
        },
      })
      .exec();

    if (!user) {
      const error = new Error("User not found !!");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ courses: user.courses });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // Server error
    }
    next(err);
  }
};

module.exports = {
  getProfile,
  getAnotherProfile,
  addProfile,
  updateProfile,
  registerCourse,
  getCourses,
};
