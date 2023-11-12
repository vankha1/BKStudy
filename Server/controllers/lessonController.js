
const fs = require('fs');

const User = require('../models/userModel');
const Course = require('../models/courseModel');
const Lesson = require('../models/lessonModel');
const Note = require('../models/noteModel');

//This controller is now use to handle request about contents of a specific course (chapters, lessons)

// all priviledge

const getAllLessons = async (req, res, next) => {
  //res.send("get all lesson from controller")
  try {
    const userId = req.body.userId;
    const courseId = req.params.courseId;

    const user = await User.findById(courseId);
    const course = await Course.findById(courseId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    if (!course) {
      const error = new Error("Course not found");
      error.statusCode = 404;
      throw error;
    }

    //validate access right of user
    let courseflag = false;
    for (let c of user.courses) {
      if (c.courseId == course._id) {
        courseflag = true;
        break;
      }
    }
    if (!courseflag) {
      const error = new Error("Access denied")
      error.statusCode = 401;
      throw error;
    }

    res.status(200).json({

      course: course,
      lessons: course.lessons,
    })

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getLesson = async (req, res, next) => {
  //res.send("get specific lesson from controller");
  try {

    const userId = req.body.id;
    const courseId = req.params.courseId;
    const lessonId = req.params.lessonId;


    const user = await User.findById(userId);
    const course = await Course.findById(courseId);
    const lesson = await Lesson.findById(lessonId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    if (!course) {
      const error = new Error("Course not found");
      error.statusCode = 404;
      throw error;
    }
    if (!lesson) {
      const error = new Error("Lesson not found");
      error.statusCode = 404;
      throw error;
    }


    //validate lesson in course
    let courseflag = false, lessonflag = false;
    for (let c of user.courses) {
      if (c.courseId == course._id) {
        courseflag = true;
        break
      }
    }
    for (let l of course.lessons) {
      if (l.lessonId == lesson._id) {
        lessonflag = true;
        break;
      }
    }
    if (!(courseflag && lessonflag)) {
      const error = new Error("Access denied");
      error.statusCode = 401;
      throw error;
    }

    if (user.userType == "LECTURE") {
      res.status(200).json({
        course: course,
        lesson: lesson,
      })
    }
    else {
      const note = await Note.findOne({ userId: userId, lessonId: lessonId });
      res.status(200).json({
        course: course,
        lesson: lesson,
        note: note,
      })
    }

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


// teacher's priviledge

const createLesson = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const courseId = req.params.courseId;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    if (!course) {
      const error = new Error("Course not found");
      error.statusCode = 404;
      throw error;
    }

    //validate ownership
    let courseflag = false;
    for (let c of user.courses) {
      if (c.courseId == course._id) {
        courseflag = true;
        break;
      }
    }
    if (!courseflag) {
      const error = new Error("Access denied")
      error.statusCode = 401;
      throw error;
    }

    //video URL is not neccessary, the whole lesson can just be only reading
    //file is also not neccessary, same idea as above
    const title = req.body.title;
    const contents = req.body.contents;
    const videoURL = req.body.videoURL != "" ? req.body.videoURL : null;
    let attachedFileCount = 0;
    //handle attach files
    const attachedFiles = [];
    //append file
    if (!req.files) {
      attachedFileCount = 0;
    } else {
      let count = 0;
      for (let prop in req.files) {
        count++;
        const file = {
          filename: req.files[prop].originalname,
          filepath: req.files[prop].path
            .replace(/\\\\/g, "/")
            .replace(/\\/g, "/"),
        };
        //console.log(file);
        attachedFiles.push(file);
      }
      attachedFileCount = count;
    }

    let lesson = new Lesson({
      title: title,
      contents: contents,
      videoURL: videoURL,
      attachedFileCount: attachedFileCount,
      attachedFiles: attachedFiles,
      courseId,
    });
    //console.log(lesson);

    await lesson.save();

    course.lessons.push({ lessonId: lesson._id });
    //if (lesson.videoURL) course.numberOfVideo += 1;
    await course.save();


    res.status(201).json({
      course: course,
      lesson: lesson,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const updateLesson = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const lessonId = req.params.lessonId;
    //res.send("edit lesson from controller");
    //console.log(lessonId);

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);
    const lesson = await Lesson.findById(lessonId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    if (!course) {
      const error = new Error("Course not found");
      error.statusCode = 404;
      throw error;
    }
    if (!lesson) {
      const error = new Error("Lesson not found");
      error.statusCode = 404;
      throw error;
    }

    //validate ownership
    let courseflag = false, lessonflag = false;
    for (let c of user.courses) {
      if (c.courseId == course._id) {
        courseflag = true;
        break
      }
    }
    for (let l of course.lessons) {
      if (l.lessonId == lesson._id) {
        lessonflag = true;
        break;
      }
    }
    if (!(courseflag && lessonflag)) {
      const error = new Error("Access denied");
      error.statusCode = 401;
      throw error;
    }

    //before change
    const oldVideoURL = lesson.videoURL;
    for (file of lesson.attachedFiles) {
      await fs.unlink(file.filepath, (err) => {
        if (err) console.log(err);
      });
    }
    //after change
    const title = req.body.title;
    const contents = req.body.contents;
    const videoURL = req.body.videoURL != "" ? req.body.videoURL : null;
    let attachedFileCount = 0;
    const attachedFiles = [];

    if (!req.files) {
      attachedFileCount = 0;
    } else {
      let count = 0;
      for (let prop in req.files) {
        count++;
        const file = {
          filename: req.files[prop].originalname,
          filepath: req.files[prop].path
            .replace(/\\\\/g, "/")
            .replace(/\\/g, "/"),
        };
        //console.log(file);
        attachedFiles.push(file);
      }
      attachedFileCount = count;
    }

    lesson.title = title;
    lesson.contents = contents;
    lesson.videoURL = videoURL;
    lesson.attachedFileCount = attachedFileCount;
    lesson.attachedFiles = attachedFiles;

    await lesson.save();

    if (oldVideoURL && !lesson.videoURL) course.numberOfVideo -= 1; // from "have video" to "no video"
    else if (!oldVideoURL && lesson.videoURL) course.numberOfVideo += 1; //from "no video" to "have video"
    await course.save();
    res.status(201).json({
      course: course,
      lesson: lesson,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const deleteLesson = async (req, res, next) => {
  //res.send("delete lesson from controller");
  try {
    const userId = req.body.userId;
    const courseId = req.params.courseId;
    const lessonId = req.params.lessonId;


    const course = await Course.findById(courseId);
    const lesson = await Lesson.findById(lessonId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    if (!course) {
      const error = new Error("Course not found");
      error.statusCode = 404;
      throw error;
    }
    if (!lesson) {
      const error = new Error("Lesson not found");
      error.statusCode = 404;
      throw error;
    }

    //validate ownership
    let courseflag = false, lessonflag = false;
    for (let c of user.courses) {
      if (c.courseId == course._id) {
        courseflag = true;
        break
      }
    }
    for (let l of course.lessons) {
      if (l.lessonId == lesson._id) {
        lessonflag = true;
        break;
      }
    }
    if (!(courseflag && lessonflag)) {
      const error = new Error("Access denied");
      error.statusCode = 401;
      throw error;
    }


    //clear files in file system
    for (file of lesson.attachedFiles) {
      await fs.unlink(file.filepath, (err) => {
        if (err) console.log(err);
      });
    }

    const videoURL = lesson.videoURL;
    const postId = lesson._id;
    await Lesson.findByIdAndDelete(lesson._id)
    let index = 0;
    for (let l of course.lessons) {
      if (l.lessonId == postId) {
        course.lesson.slice(index, 1);
        break;
      }
      index++;
    }
    if (videoURL) course.numberOfVideo -= 1;
    await course.save();

    res.status(200).json({});

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// student's priviledge

const updateNote = async (req, res, next) => {
  try {
    const userId = req.body.userId
    const lessonId = req.params.lessonId;

    const note = await Note.findOne({ userId: userId, lessonId: lessonId });

    if (!note) {
      const error = new Error("Note not found !");
      error.statusCode = 404;
      throw error;
    }

    note.contents = req.body.contents;

    await note.save();


    res.status(201).json({
      message: "Change note successfully",
      note
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const downloadFile = async (req, res, next) => {
  try {
    const filepath = req.params.filepath
    res.download()
  } catch (err) {
    console.log(err)
    if (!err.statusCode) {
      err.statusCode = 404;
    }
    next(err)
  }
}

module.exports = {
  getAllLessons,
  getLesson,
  createLesson,
  updateLesson,
  deleteLesson,
  updateNote,
  downloadFile,
};
