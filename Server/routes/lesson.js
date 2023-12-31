const express = require('express');
const { body } = require("express-validator");

const router = express.Router();
const lessonFileMulter = require('../middleware/lessonFileMulter');
const lessonController = require('../controllers/lessonController');
const isAuth = require('../middleware/isAuth');

// all

// user get all lesson from the course
router.get('/course/:courseId',
    isAuth.authToken,
    isAuth.authRoles(["LECTURER", "STUDENT"]),
    lessonController.getAllLessons
);


// user get a specific lesson from the course
router.get('/course',
    isAuth.authToken,
    isAuth.authRoles(["LECTURER", "STUDENT"]),
    lessonController.getLesson
)


// teacher's priviledge

// teacher create a lesson in the course
router.post('/create/:courseId',
    isAuth.authToken,
    isAuth.authRoles(["LECTURER"]),
    lessonFileMulter.uploadLessonFile.array("files"),
    lessonController.createLesson
);

// teacher update lesson's information in the course
router.put('/update',
    isAuth.authToken,
    isAuth.authRoles(["LECTURER"]),
    lessonFileMulter.uploadLessonFile.array("files"),
    lessonController.updateLesson
);

// teacher delete lesson in the course
router.delete('/delete',
    isAuth.authToken,
    isAuth.authRoles(["LECTURER"]),
    lessonController.deleteLesson
);

// student's priviledge

router.put('/update-note',
    isAuth.authToken,
    isAuth.authRoles(["STUDENT"]),
    lessonController.updateNote
);

router.get('/file/:filepath',
    isAuth.authToken,
    lessonController.getFile
)

router.get('/download/:fileName',
    isAuth.authToken,
    isAuth.authRoles(["STUDENT"]),
    lessonController.downloadFile
);


module.exports = router;