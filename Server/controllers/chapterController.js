const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Lesson = require("../models/lessonModel");

// post: /api/v1/chapter/create?courseId=....
const createChapter = async (req, res, next) => {
  try {
    //res.send("create chapter from controller");
    const userId = req.userId;
    const courseId = req.query.courseId;

    const user = await User.findOne({
      _id: userId,
      "courses.courseId": courseId,
    });

    if (!user) {
      const error = new Error("Course not matching");
      error.statusCode = 401;
      throw error;
    }

    const course = await Course.findById(courseId);

    course.chapters.push({
      name: req.body.name,
      lessons: [],
    });

    //console.log(course);
    await course.save();

    res.status(200).json({
      message: "create chapter successfully",
      chapter: course.chapters.slice(-1), // get last element
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// PUT /update?courseId=...&
const updateChapter = async (req, res, next) => {
  try {
    //res.send("update chapter from controller");
    const userId = req.userId;
    const courseId = req.query.courseId;
    const chapter = req.query.chapter;

    const user = await User.findOne({
      _id: userId,
      "courses.courseId": courseId,
    });

    if (!user) {
      const error = new Error("Course not matching");
      error.statusCode = 401;
      throw error;
    }

    const course = await Course.findById(courseId);

    if (chapter < 0 || chapter >= course.chapters.length) {
      const error = new Error("Chapter not found");
      error.statusCode = 402;
      throw error;
    }

    course.chapters[chapter].name = req.body.name;

    await course.save();

    res.status(200).json({
      message: "update chapter successfully",
      chapter: course.chapters[chapter],
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// DELETE /delete?courseId=...&chapter=....
const deleteChapter = async (req, res, next) => {
  try {
    //res.send("delete chapter from controller");
    const userId = req.userId;
    const courseId = req.query.courseId;
    const chapter = req.query.chapter;

    const user = await User.findOne({
      _id: userId,
      "courses.courseId": courseId,
    });

    if (!user) {
      const error = new Error("Course not matching");
      error.statusCode = 401;
      throw error;
    }

    const course = await Course.findById(courseId);

    course.chapters.splice(chapter, 1);
    await course.save();

    res.status(200).json({
      message: "delete chapter successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  createChapter,
  updateChapter,
  deleteChapter,
};
