const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

const Course = require("../models/courseModel");
const User = require("../models/userModel");

// GET /
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      message: "Fetched courses successfully !!",
      courses,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET /course-detail/:courseId
const getCourse = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId).populate(
      "chapters.lessons.lessonId",
      "title -_id"
    );
    if (!course) {
      const error = new Error("No course found !!!");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ course });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET /students/:courseId
const getStudents = async (req, res, next) => {
  try {
    const userId = req.userId;
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);

    if (!course) {
      const error = new Error("No course found");
      error.statusCode = 401;
      throw error;
    }

    const user = await User.findOne({
      _id: userId,
      "courses.courseId": courseId,
    });
    if (!user) {
      const error = new Error("User not in course");
      error.statusCode = 402;
      throw error;
    }

    const users = await User.find(
      { "courses.courseId": courseId },
      "fullname username joinedDate"
    );
    if (users.length === 0) {
      const error = new Error("Course not created");
      error.statusCode = 403;
      throw error;
    }

    res.status(200).json({
      users,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET /:courseId/:detailUserId
const getStudent = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { courseId, detailUserId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      const error = new Error("No course found");
      error.statusCode = 401;
      throw error;
    }
    // check user in course
    const users = await User.find({
      _id: { $in: [userId, detailUserId] },
      "courses.courseId": courseId,
    });

    if (users.length < 2) {
      const error = new Error("One of the users is not in the course");
      error.statusCode = 402;
      throw error;
    }

    const userIndex = users.findIndex(user => user._id.toString() === detailUserId);
    res.status(200).json(users[userIndex]);
    
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// POST /create
const createCourse = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect");
      error.statusCode = 422;
      throw error;
    }
    // console.log(req);
    if (!req.file) {
      const error = new Error("No image provided");
      error.statusCode = 422;
      throw error;
    }

    const title = req.body.title;
    const temp = req.file.path.replace(/\\/g, "/").split("images");
    const imageUrl = "images" + temp[1];
    const description = req.body.description;
    const price = req.body.price;

    const course = new Course({
      title,
      imageUrl,
      description,
      price,
      createdBy: req.userId,
      numberOfStudent: 0,
      numberOfVideo: 0,
      isApproved: false,
    });

    await course.save();

    const user = await User.findById(req.userId);
    user.courses.push({
      courseId: course._id,
      enrolledDate: new Date(),
    });
    await user.save();

    res.status(200).json({
      message: "Course is sent to admin",
      course: course,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
/* 
const updateCourse = async (req, res, next) => {
  const courseId = req.params.courseId;

  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;

  if (req.file) {
    imageUrl = req.file.path.replace("\\", "/");
  }

  if (imageUrl) {
    const error = new Error("No file picked");
    error.statusCode = 422;
    throw error;
  }

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      const error = new Error("No course found !!!");
      error.statusCode = 404;
      throw error;
    }
    if (course.createdBy.toString() !== req.userId) {
      const error = new Error("Not authenticated");
      error.statusCode = 403;
      throw error;
    }
    course.title = title;
    course.description = description;
    course.price = price;
    course.imageUrl = imageUrl;

    const result = await course.save();

    res.status(200).json({
      message: "Updated course successfully !!!",
      course: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // Server error
    }
    next(err);
  }
};
 */

// DELETE /:courseId
const deleteCourse = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      const error = new Error("No course found !!!");
      error.statusCode = 404;
      throw error;
    }
    if (course.createdBy.toString() !== req.userId) {
      const error = new Error("Not authenticated");
      error.statusCode = 403;
      throw error;
    }
    clearImage(course.imageUrl);

    await Course.findByIdAndRemove(courseId);

    await User.updateOne(
      { _id: req.userId },
      { $pull: { courses: { courseId: courseId } } }
    );

    res.status(200).json({
      message: "Delete course successfully !!!",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // Server error
    }
    next(err);
  }
};

const clearImage = (filePath) => {
  // we are in controller folder, so we need to jump out of that by using '..'
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};

module.exports = {
  getAllCourses,
  getCourse,
  getStudents,
  getStudent,
  createCourse,
  deleteCourse,
};