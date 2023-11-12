const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Lesson = require("../models/lessonModel");
const Note = require("../models/noteModel");

// all priviledge
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
      lessons: course.chapters.lessons,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// teacher's priviledge

const getLessonsByIdTeacher = async (req, res, next) => {
  res.send("teacher get lesson from controller");
  try {
    //const { userId } = req.params.userId;
    const { courseId, lessonId } = req.params;

    //const user = await User.findById(userId).populate('courses.courseId').exec();
    const course = await Course.findById(courseId);
    const lesson = await Lesson.findById(lessonId);

    //validate existence
    if (!user) {
      const error = new Error("User not found !");
      error.statusCode = 404;
      throw error;
    }
    if (!course) {
      const error = new Error("Course not found !");
      error.statusCode = 404;
      throw error;
    }
    if (!lesson) {
      const error = new Error("Lesson not found !");
      error.statusCode = 404;
      throw error;
    }

    //validate ownership

    res.status(200).json({
      message: "get lesson successfully",
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

const createLesson = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);

    if (!course) {
      const error = new Error("Course not found !");
      error.statusCode = 422;
      throw error;
    }
    //video URL is not neccessary, the whole lesson can just be only reading
    //file is also not neccessary, same idea as above
    const title = req.body.title;
    const contents = req.body.contents;
    const description = req.body.description;
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
      description: description,
      videoURL: videoURL,
      attachedFileCount: attachedFileCount,
      attachedFiles: attachedFiles,
      courseId,
    });
    //console.log(lesson);

    await lesson.save();

    course.chapters.lesson.push(lesson._id);
    await course.save();

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
};

const updateLesson = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const lessonId = req.params.lessonId;
    //res.send("edit lesson from controller");
    console.log(lessonId);

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      const error = new Error("Lesson not found !");
      error.statusCode = 404;
      throw error;
    }

    const lastChanged = new Date();
    const title = req.body.title;
    const contents = req.body.contents;
    const description = req.body.description;
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

    lesson.lastChanged = lastChanged;
    lesson.title = title;
    lesson.contents = contents;
    lesson.videoURL = videoURL;
    lesson.attachedFileCount = attachedFileCount;
    lesson.attachedFiles = attachedFiles;

    await lesson.save();
    res.status(200).json({
      message: "Change lesson successfully",
      lesson: lesson,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// student's priviledge

const getLessonsByIdStudent = async (req, res, next) => {
  //res.send("get lesson from controller");
  // if user doesnt have any association with the course -> kick user to course's description page
  // if user is the owner of the course, move to edit mode
  // if user is enrolling in this course, move to normal mode
  try {
    const { userId, courseId, lessonId } = req.params;
    // use course to render side bar
    // use lesson to render main content

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);
    const lesson = await Lesson.findById(lessonId);

    if (!user) {
      const error = new Error("User not found !");
      error.statusCode = 404;
      throw error;
    }
    if (!course) {
      const error = new Error("Course not found !");
      error.statusCode = 404;
      throw error;
    }
    if (!lesson) {
      const error = new Error("Lesson not found !");
      error.statusCode = 404;
      throw error;
    }

    const note = await Note.findOne({ userId: user._id, lessonId: lesson._id });
    // should alway be return something, even if contents of the note is empty, for student role
    // (this mean the moment a student registering course, it'll automatically generate empty note for each lesson
    //  and store them in db)

    if (!note) {
      const error = new Error("Note not found !");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      chapter: course.chapters,
      lesson: lesson,
      note: note,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const { userId } = req.params.userId;
    const { lessonId } = req.params.lessonId;

    const note = await Note.findOne({ userId: userId, lessonId: lessonId });

    if (!note) {
      const error = new Error("Note not found !");
      error.statusCode = 442;
      throw error;
    }

    note.contents = req.body.contents;

    await note.save();

    res.status(200).json({
      message: "change note successfully",
      note,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getLessons,
  getLessonsByIdTeacher,
  createLesson,
  updateLesson,
  getLessonsByIdStudent,
  updateNote,
};
