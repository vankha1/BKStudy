const fs = require("fs");

const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Lesson = require("../models/lessonModel");
const Note = require("../models/noteModel");

//This controller is now use to handle request about contents of a specific course (chapters, lessons)
const fs = require("fs");

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

        if (!courseInUser) {
            const error = new Error("Access denied");
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

        if (user.userType == "LECTURE") {
            res.status(200).json({
                lesson: lesson,
            });
        }

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
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

// teacher's priviledge
// teacher's priviledge

// POST /create/:courseId
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
        const nameOfChapter = req.body.nameOfChapter;
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
            //console.log(file);
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
        //console.log(lesson);

        await lesson.save();

        if (course.chapters[chapter]) {
            course.chapters[chapter].lessons.push({
                lessonId: lesson._id,
            });
        } else {
            course.chapters.splice(chapter, 0, {
                name: nameOfChapter,
                lessons: [{ lessonId: lesson._id }],
            });
        }
        //if (lesson.videoURL) course.numberOfVideo += 1;
        await course.save();


        res.status(201).json({
            message: "Lesson created successfully",
            lesson: lesson
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

// PUT /update?courseId=...&lessonId=...
// PUT /update?courseId=...&lessonId=...
const updateLesson = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { courseId, lessonId } = req.query;
        //res.send("edit lesson from controller");
        //console.log(lessonId);

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


        //before change
        const oldVideoURL = lesson.videoURL;
        lesson.attachedFiles.forEach((file) => {
            try {
                fs.unlinkSync(file.filepath);
            } catch (err) {
                console.log(err);
            }
        });
        //after change
        const title = req.body.title;
        const contents = req.body.contents;
        const videoURL = req.body.videoURL != "" ? req.body.videoURL : null;
        const chapter = parseInt(req.body.chapter);
        const attachedFiles = [];

        for (let prop in req.files) {
            const file = {
                filename: req.files[prop].originalname,
                filepath: req.files[prop].path
                    .replace(/\\\\/g, "/")
                    .replace(/\\/g, "/"),
            };
            //console.log(file);
            attachedFiles.push(file);
        }

        lesson.title = title;
        lesson.contents = contents;
        lesson.videoURL = videoURL;
        if (chapter !== lesson.chapter) {
            const foundLesson = course.chapters[lesson.chapter].lessons.filter(lesson => lesson.lessonId.toString() !== lessonId);

            console.log(foundLesson);

            course.chapters[lesson.chapter].lessons = foundLesson

            if (course.chapters[chapter]) {
                course.chapters[chapter].lessons.push({
                    lessonId: lesson._id,
                });
            } else {
                course.chapters.splice(chapter, 0, {
                    name: nameOfChapter,
                    lessons: [{ lessonId: lesson._id }],
                });
            }
        }
        lesson.chapter = chapter;
        lesson.attachedFiles = attachedFiles;

        await lesson.save();

        if (oldVideoURL && !lesson.videoURL) course.numberOfVideo = course.numberOfVideo <= 0 ? 0 : course.numberOfVideo - 1; // from "have video" to "no video"
        else if (!oldVideoURL && lesson.videoURL) course.numberOfVideo += 1; //from "no video" to "have video"

        await course.save();
        res.status(201).json({
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
    //res.send("delete lesson from controller");
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
            { 'chapters.lessons.lessonId': lessonId },
            { $pull: { 'chapters.$.lessons': { lessonId: lessonId } } }
        );

        if (videoURL) {
            course.numberOfVideo = course.numberOfVideo <= 0 ? 0 : course.numberOfVideo - 1;
        };
        await course.save();

        res.status(200).json({
            message: "Delete lesson successfully"
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
                lessonId
            })
        }

        note.contents = req.body.contents;

        await note.save();

        res.status(201).json({
            message: "Change note successfully",
            note,
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
        const filepath = req.params.filepath;
        res.download(filepath);
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
    downloadFile,
};