const express = require('express');
const { body } = require("express-validator");

const router = express.Router();
const lessonFileMulter = require('../middleware/lessonFileMulter');
const lessonController = require('../controllers/lessonController');
const isAuth = require('../middleware/isAuth');

router.get('/:courseId', lessonController.getLessons)

router.post('/create/:courseId',
    isAuth.authToken,
    isAuth.authRoles(["LECTURER"]),
    lessonFileMulter.uploadLessonFile.array("files"),
    lessonController.createLesson
);

router.get('/update', lessonController.updateLesson)

module.exports = router;