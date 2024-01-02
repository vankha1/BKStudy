const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Lesson = require("../models/lessonModel");
const Note = require("../models/noteModel");

//This controller is now use to handle request about contents of a specific course (chapters, lessons)

// all priviledge
// GET /course/:courseId
const getAllLessons = async (req, res, next) => {
  try {
    const userId = req.userId;
    const courseId = req.params.courseId;

    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }

    const courseInUser = await user.courses.filter((c) => {
      return c.courseId.toString() === courseId;
    });

    if (courseInUser.length === 0) {
      const error = new Error("Course not matching");
      error.statusCode = 401;
      throw error;
    }

    const course = await Course.findById(courseInUser[0].courseId).populate(
      "chapters.lessons.lessonId"
    );

    if (!course) {
      const error = new Error("Course not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      courseName: course.title,
      chapters: course.chapters,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET /course?courseId=...&lessonId=...
const getLesson = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { courseId, lessonId } = req.query;

    const user = await User.findOne({
      _id: userId,
      "courses.courseId": courseId,
    });

    if (!user) {
      const error = new Error("Course not matching");
      error.statusCode = 401;
      throw error;
    }

    const course = await Course.findOne({
      _id: courseId,
      "chapters.lessons.lessonId": lessonId,
    });

    if (!course) {
      const error = new Error("Lesson not matching");
      error.statusCode = 404;
      throw error;
    }

    const lesson = await Lesson.findById(lessonId);

    if (user.userType == "LECTURER") {
      res.status(200).json({
        lesson: lesson,
      });
    } else {
      const note = await Note.findOne({ userId: userId, lessonId: lessonId });

      if (!note) {
        const error = new Error("Note not found");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        lesson: lesson,
        note: note,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// teacher's priviledge

// POST /create/:courseId
const createLesson = async (req, res, next) => {
  try {
    const userId = req.userId;
    const courseId = req.params.courseId;

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

    //video URL is not neccessary, the whole lesson can just be only reading
    //file is also not neccessary, same idea as above
    const title = req.body.title;
    const contents = req.body.contents;
    const videoURL = req.body.videoURL != "" ? req.body.videoURL : null;
    const chapter = parseInt(req.body.chapter);
    // const nameOfChapter = req.body.nameOfChapter;

    //handle attach files
    const attachedFiles = [];
    //append file
    let count = 0;
    for (let prop in req.files) {
      count++;
      const file = {
        filename: req.files[prop].originalname,
        filepath: req.files[prop].path
          .replace(/\\\\/g, "/")
          .replace(/\\/g, "/"),
      };
      attachedFiles.push(file);
    }

    let lesson = new Lesson({
      title: title,
      contents: contents,
      videoURL: videoURL,
      attachedFiles: attachedFiles,
      courseId: course._id,
      chapter,
    });

    await lesson.save();

    if (chapter < 0 || chapter >= course.chapters.length) {
      const error = new Error("Chapter not found");
      error.statusCode = 402;
      throw error;
    }
    course.chapters[chapter].lessons.push({
      lessonId: lesson._id,
    });
    // if (course.chapters[chapter]) {

    // }
    // else {
    //     course.chapters.splice(chapter, 0, {
    //         name: nameOfChapter,
    //         lessons: [{ lessonId: lesson._id }],
    //     });
    // }
    if (lesson.videoURL) course.numberOfVideo += 1;
    await course.save();

    res.status(201).json({
      message: "Lesson created successfully",
      lesson: lesson,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// PUT /update?courseId=...&chapter=...&lessonId=...
// const updateLesson = async (req, res, next) => {
//   try {
//     const userId = req.userId;
//     const { courseId, chapter, lessonId } = req.query;

//     const user = await User.findOne({
//       _id: userId,
//       "courses.courseId": courseId,
//     });

//     if (!user) {
//       const error = new Error("Course not matching");
//       error.statusCode = 401;
//       throw error;
//     }

//     const course = await Course.findOne({
//       _id: courseId,
//       "chapters.lessons.lessonId": lessonId,
//     });

//     const isMatchedLesson = course.chapters[chapter].lessons.some(
//       (lesson) => lesson.lessonId.toString() === lessonId
//     );

//     if (!course || !isMatchedLesson) {
//       const error = new Error("Lesson not matching");
//       error.statusCode = 404;
//       throw error;
//     }

//     const lesson = await Lesson.findById(lessonId);

//     //before change
//     const oldVideoURL = lesson.videoURL;
//     lesson.attachedFiles.forEach((file) => {
//       try {
//         fs.unlinkSync(file.filepath);
//       } catch (err) {
//         console.log(err);
//       }
//     });
//     //after change
//     const title = req.body.title;
//     const contents = req.body.contents;
//     const videoURL = req.body.videoURL != "" ? req.body.videoURL : null;
//     const attachedFiles = [];

//     for (let prop in req.files) {
//       const file = {
//         filename: req.files[prop].originalname,
//         filepath: req.files[prop].path
//           .replace(/\\\\/g, "/")
//           .replace(/\\/g, "/"),
//       };
//       //console.log(file);
//       attachedFiles.push(file);
//     }

//     lesson.title = title;
//     lesson.contents = contents;
//     lesson.videoURL = videoURL;
//     /* case in which lesson moves from one chapter to another
//     if (chapter !== lesson.chapter) {
//       const foundLesson = course.chapters[lesson.chapter].lessons.filter(
//         (lesson) => lesson.lessonId.toString() !== lessonId
//       );

//       console.log(foundLesson);

//       course.chapters[lesson.chapter].lessons = foundLesson;

//       if (course.chapters[chapter]) {
//         course.chapters[chapter].lessons.push({
//           lessonId: lesson._id,
//         });
//       } else {
//         course.chapters.splice(chapter, 0, {
//           name: nameOfChapter,
//           lessons: [{ lessonId: lesson._id }],
//         });
//       }
//     }
//     lesson.chapter = chapter;
//     */
//     lesson.attachedFiles = attachedFiles;

//     await lesson.save();

//     if (oldVideoURL && !lesson.videoURL)
//       course.numberOfVideo =
//         course.numberOfVideo <= 0 ? 0 : course.numberOfVideo - 1;
//     // from "have video" to "no video"
//     else if (!oldVideoURL && lesson.videoURL) course.numberOfVideo += 1; //from "no video" to "have video"

//     await course.save();
//     res.status(201).json({
//       message: "Update lesson successfully !!!",
//       lesson: lesson,
//     });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

const updateLesson = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { courseId, chapter, lessonId } = req.query;

    const user = await User.findOne({
      _id: userId,
      "courses.courseId": courseId,
    });

    if (!user) {
      const error = new Error("Course not matching");
      error.statusCode = 401;
      throw error;
    }

    const course = await Course.findOne({
      _id: courseId,
      "chapters.lessons.lessonId": lessonId,
    });

    const isMatchedLesson = course.chapters[chapter].lessons.some(
      (lesson) => lesson.lessonId.toString() === lessonId
    );

    if (!course || !isMatchedLesson) {
      const error = new Error("Lesson not matching");
      error.statusCode = 404;
      throw error;
    }

    const lesson = await Lesson.findById(lessonId);

    // Before change
    const oldVideoURL = lesson.videoURL;

    // After change
    const title = req.body.title || lesson.title;
    const contents = req.body.contents || lesson.contents;
    const videoURL = req.body.videoURL
      ? req.body.videoURL !== ""
        ? req.body.videoURL
        : null
      : lesson.videoURL;
    const oldFiles = req.body.oldFiles ? JSON.parse(req.body.oldFiles) : [];
    let filesToDelete = []
    // Remove old attachedFiles
    if (oldFiles.length) {
      // lesson.attachedFiles.forEach((file) => {
      //   try {
      //     fs.unlinkSync(file.filepath);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // });
      filesToDelete = lesson.attachedFiles.filter(
        item1 => !oldFiles.some(item2 => item2.filename === item1.filename)
      );
      lesson.attachedFiles = lesson.attachedFiles.filter(
        item1 => oldFiles.some(item2 => item2.filename === item1.filename)
      );
      filesToDelete && filesToDelete.forEach((file) => {
        try {
          fs.unlinkSync(file.filepath);
        } catch (err) {
          console.log(err);
        }
      });
    } else {
      lesson.attachedFiles.forEach((file) => {
        try {
          fs.unlinkSync(file.filepath);
        } catch (err) {
          console.log(err);
        }
      });
    }

    let attachedFiles = oldFiles.length ? lesson.attachedFiles : [];

    if (req.files.length) {
      for (let prop in req.files) {
        const file = {
          filename: req.files[prop].originalname,
          filepath: req.files[prop].path
            .replace(/\\\\/g, "/")
            .replace(/\\/g, "/"),
        };
        attachedFiles.push(file);
      }
    }
    // const attachedFiles = req.files
    //   ? req.files.map((file) => ({
    //       filename: file.originalname,
    //       filepath: file.path.replace(/\\\\/g, "/").replace(/\\/g, "/"),
    //     }))
    //   : lesson.attachedFiles;

    lesson.title = title;
    lesson.contents = contents;
    lesson.videoURL = videoURL;
    lesson.attachedFiles = attachedFiles;

    await lesson.save();

    if (oldVideoURL && !lesson.videoURL)
      course.numberOfVideo =
        course.numberOfVideo <= 0 ? 0 : course.numberOfVideo - 1;
    // from "have video" to "no video"
    else if (!oldVideoURL && lesson.videoURL) course.numberOfVideo += 1; // from "no video" to "have video"

    await course.save();
    res.status(202).json({
      message: "Update lesson successfully !!!",
      lesson: lesson,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// DELETE /delete?courseId=...&&lessonId=...
const deleteLesson = async (req, res, next) => {
  try {
    const userId = req.userId;

    const { courseId, lessonId } = req.query;

    const user = await User.findOne({
      _id: userId,
      "courses.courseId": courseId,
    });

    if (!user) {
      const error = new Error("Course not matching");
      error.statusCode = 401;
      throw error;
    }

    const course = await Course.findOne({
      _id: courseId,
      "chapters.lessons.lessonId": lessonId,
    });

    if (!course) {
      const error = new Error("Lesson not matching");
      error.statusCode = 404;
      throw error;
    }

    const lesson = await Lesson.findById(lessonId);

    //clear files in file system
    lesson.attachedFiles.forEach((file) => {
      try {
        fs.unlinkSync(file.filepath);
      } catch (err) {
        console.log(err);
      }
    });

    const videoURL = lesson.videoURL;
    await Lesson.findByIdAndDelete(lessonId);

    // chapters.$.lessons means “the lessons field of the element in the chapters array that matched the query condition”. The $pull operator then removes from the lessons array the element that matches the specified condition ({ lessonId: lessonId }).
    await Course.updateMany(
      { "chapters.lessons.lessonId": lessonId },
      { $pull: { "chapters.$.lessons": { lessonId: lessonId } } }
    );

    if (videoURL) {
      course.numberOfVideo =
        course.numberOfVideo <= 0 ? 0 : course.numberOfVideo - 1;
    }
    await course.save();

    res.status(200).json({
      message: "Delete lesson successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// student's priviledge

// PUT /update-note?courseId=...?lessonId=...
const updateNote = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { courseId, lessonId } = req.query;

    const course = await Course.findOne({
      _id: courseId,
      "chapters.lessons.lessonId": lessonId,
    });

    if (!course) {
      const error = new Error("Lesson not matching");
      error.statusCode = 404;
      throw error;
    }

    let note = await Note.findOne({ userId: userId, lessonId: lessonId });

    if (!note) {
      note = new Note({
        contents: "",
        userId,
        lessonId,
      });
    }

    note.contents = req.body.contents;

    await note.save();

    res.status(201).json({
      message: "Change note successfully",
      note: note,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET /file/:filepath
const getFile = async (req, res, next) => {
  try {
    const filepath = decodeURIComponent(req.params.filepath);
    res.sendFile(filepath, (err) => {
      if (err) throw err;
      //console.log("send file successfully");
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//GET /download/:filepath
const downloadFile = async (req, res, next) => {
  try {
    const fileNameString = decodeURIComponent(req.params.fileName);

    // handle two string format:
    // 1: <<new file name>>*<<old file name>>.<<extender>>
    // 2: <<old file name>>.<<extender>>
    let newName, oldName, ext;
    if (fileNameString.includes('*')) {
      // first format - split string to get new file name and concat to <<new file name>>.<<extender>>
      ext = fileNameString.split('.')[1];
      newName = fileNameString.split('*')[0].concat(".", ext);
      oldName = fileNameString.split('*')[1];
    }
    else {
      // second format
      newName = oldName = fileNameString;
    }

    // attach old name to server's files system
    const filePath = path.join(__dirname, "../files/", oldName);

    res.download(filePath, newName, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getAllLessons,
  getLesson,
  createLesson,
  updateLesson,
  deleteLesson,
  updateNote,
  getFile,
  downloadFile,
};
