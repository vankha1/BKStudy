const express = require('express');
const { body } = require("express-validator");

const router = express.Router();
const lessonFileMulter = require('../middleware/lessonFileMulter');
const lessonController = require('../controllers/lessonController');
const isAuth = require('../middleware/isAuth');

router.get('/teacher/:userId/:courseId/', lessonController.getLessons);

router.get('/student/:userId/:courseId/', lessonController.getLessons);

router.get('/teacher/:userId/:courseId/:lessonId/',
    lessonController.getLessonsByIdTeacher,
);


router.post('/teacher/:userId/:courseId/create-lesson',
    isAuth.authToken,
    isAuth.authRoles(["LECTURER"]),
    lessonFileMulter.uploadLessonFile.array("files"),
    lessonController.createLesson
);

router.put('/teacher/:userId/:courseId/:lessonId/update-lesson',
    isAuth.authToken,
    isAuth.authRoles(["LECTURER"]),
    lessonFileMulter.uploadLessonFile.array("files"),
    lessonController.updateLesson
);

router.get('/student/:userId/:courseId/:lessonId/',
    isAuth.authToken,
    isAuth.authRoles(["STUDENT"]),
    lessonController.getLessonsByIdStudent
);

router.put('/student/:userId/:courseId/:lessonId/update-note',
    isAuth.authToken,
    isAuth.authRoles(["STUDENT"]),
    lessonController.updateNote
);

module.exports = router;