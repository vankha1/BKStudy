const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Lesson = require("../models/lessonModel");

// for test only
const getChapter = async (req, res, next) => {
    try {
        const userId = req.userId;
        const courseId = req.query.courseId;
        const chapter = parseInt(req.query.chapter);
        let course = await Course.findById(courseId);

        let targetChapter = await course.chapters.findIndex(c => c.number === chapter);
        if (targetChapter == -1) {
            const error = new Error("Chapter not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: "success",
            name: targetChapter.name,
            number: targetChapter.number,
            lesson: targetChapter.lessons
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

// post: /api/v1/chapter
const createChapter = async (req, res, next) => {
    try {
        //res.send("create chapter from controller");
        const userId = req.userId;
        const courseId = req.query.courseId;

        const user = await User.findOne({
            _id: userId,
            "course.courseId": courseId,
        });

        if (!user) {
            const error = new Error("Course not matching");
            error.statusCode = 401;
            throw error;
        }

        const course = await Course.findById(courseId);

        course.chapters.push({
            name: req.body.name,
            lessons: []
        });

        //console.log(course);
        await course.save();

        let chapter = course.chapters.find(chapter => chapter.name === req.body.name);
        res.status(200).json({
            message: "create chapter successfully",
            chapter: chapter,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const updateChapter = async (req, res, next) => {
    try {
        //res.send("update chapter from controller");
        const userId = req.userId;
        const courseId = req.query.courseId;
        const chapterName = req.query.chapterName;

        const user = await User.findOne({
            _id: userId,
            "course.courseId": courseId,
        });

        if (!user) {
            const error = new Error("Course not matching");
            error.statusCode = 401;
            throw error;
        }

        const course = await Course.findById(courseId);
        const targetIndex = await course.chapters.findIndex(c => c.name === chapterName);
        if (targetIndex == -1) {
            const error = new Error("Chapter not found");
            error.statusCode = 404;
            throw error;
        }

        course.chapters[targetIndex].name = req.body.name;

        await course.save();
        const targetChapter = await course.chapters.find(c => c.name === chapter);
        res.status(200).json({
            message: "update chapter successfully",
            chapter: targetChapter,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const deleteChapter = async (req, res, next) => {
    try {
        //res.send("delete chapter from controller");
        const userId = req.userId;
        const courseId = req.query.courseId;
        const chapterName = req.query.chapterName;

        const user = await User.findOne({
            _id: userId,
            "course.courseId": courseId,
        });

        if (!user) {
            const error = new Error("Course not matching");
            error.statusCode = 401;
            throw error;
        }

        const course = await Course.findById(courseId);
        const targetIndex = await course.chapters.findIndex(c => c.name === chapterName);
        if (targetIndex == -1) {
            const error = new Error("Chapter not found");
            error.statusCode = 404;
            throw error;
        }

        course.chapters.splice(targetIndex, 1);
        await course.save();
        res.status(200).json({
            message: "delete chapter successfully",
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

module.exports = {
    getChapter,
    createChapter,
    updateChapter,
    deleteChapter,
};
