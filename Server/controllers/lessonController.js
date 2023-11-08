const Lesson = require("../models/lessonModel");
const User = require("../models/userModel");

// const fs = require("fs");
// const path = require("path");
// const { validationResult } = require("express-validator");
const Course = require("../models/courseModel");

const getLessons = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);

    if (!course) {
      const error = new Error("Course not found !");
      error.statusCode = 422;
      throw error;
    }

    res.status(200).json({
      lessons: course.chapters.lessons
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const createLesson = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);

    if (!course) {
      const error = new Error("Course not found !");
      error.statusCode = 422;
      throw error;
    }

    const title = req.body.title;
    const contents = req.body.contents;
    const description = req.body.description;
    const videoURL = req.body.videoURL != "" ? req.body.videoURL : null;

    //handle attach files, config multer to change later
    const attachedFiles = [];
    //append file
    if (!req.files) {
      const error = new Error("No files !!!");
      error.statusCode = 422;
      throw error;
    }
    for (let prop in req.files) {
      const file = {
        filename: req.files[prop].originalname,
        filepath: req.files[prop].path
          .replace(/\\\\/g, "/")
          .replace(/\\/g, "/"),
      };
      console.log(file);
      attachedFiles.push(file);
    }

    let lesson = new Lesson({
      title: title,
      contents: contents,
      description: description,
      videoURL: videoURL,
      attachedFiles: attachedFiles,
      courseId,
    });
    //console.log(lesson);

    await lesson.save();

    course.chapters.lesson.push(lesson._id);
    await course.save();

    res.status(200).json({
      message: "Lesson is added",
      lesson,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const updateLesson = (req, res, next) => {
  const lessonId = req.params.lessonId;
  res.send("edit lesson from controller");
  console.log(lessonId);
  /*
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  */
};

module.exports = {
  getLessons,
  createLesson,
  updateLesson,
};
