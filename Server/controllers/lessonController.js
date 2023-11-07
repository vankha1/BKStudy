const Lesson = require('../models/lessonModel');
const User = require('../models/userModel');

const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const courseModel = require('../models/courseModel');

//
function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}
//

const getLessons = async (req, res, next) => {

}

const createLesson = async (req, res, next) => {
  /*
  let error = validationResult(req);
  //console.log(errors);
  if (!error.isEmpty()) {
    error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  */
  //req.body:
  //req.body.title: title of the lesson
  //req.body.content: what clients will read
  //req.body.videooURL: contain url from internet
  //req.files: attach files 
  const title = req.body.title;
  const content = req.body.content;
  const videoURL = req.body.videoURL != '' ? req.body.videoURL : null;
  const lastChanged = videoURL ? new Date() : null;

  //handle attach files, config multer to change later
  const attachedFiles = [];
  //append file
  if (isEmpty(req.files)) {
    //console.log(" dont have files");
  }
  else {
    //console.log("have files");
    for (let prop in req.files) {
      const file = {
        filename: req.files[prop].originalname,
        filepath: req.files[prop].path.replace(/\\\\/g, "/").replace(/\\/g, "/"),
      }
      console.log(file);
      attachedFiles.push(file);
    }
  }

  let lesson = new Lesson({
    title: title,
    contents: content,
    videoURL: videoURL,
    lastChanged: lastChanged,
    attachedFiles: attachedFiles
  })
  //console.log(lesson);
  try {
    await lesson.save();
    res.status(200).json({
      message: "Lesson is added",
      lesson: lesson,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  /*
 
  const title = req.body.title;
  const content = req.body.content;
  const videoURL = req.body.videoURL;
  const lastChanged = videoURL ? new Date() : null; 
  const attachedFiles= req.body.attachedFiles;
 
  
  
 
  const course = new Course({
    title,
    imageUrl,
    description,
    price,
    createdBy: req.userId,
    isApproved: false,
  });
 
  try {
    await course.save();
 
    // Waiting for the approval of admin
    // const user = await User.findById(req.userId);
    // user.courses.push(course)
    // await user.save()
 
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
  */
}

const editLesson = (req, res, next) => {
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


}

module.exports = {
  "createLesson": createLesson,
  "editLesson": editLesson,
}