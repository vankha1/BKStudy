const express = require('express');
const { body } = require("express-validator");

const lesson = require('../controllers/lessonController');
const router = express.Router();
const lessonFileMulter = require('../middleware/lessonFileMulter');
const lessonController = require('../controllers/lessonController');

router.get('/', (req, res) => {
    res.send("get all lesson of course here")
})

//post
router.post('/create',
    //isAuth.authToken,
    //isAuth.authRoles(["LECTURER"]),
    //[
    //body("title").trim().isLength({ min: 5 }),
    //body("description").trim().isLength({ min: 5 }),
    //],
    lessonFileMulter.uploadLessonFile.array("abc"),
    lessonController.createLesson
);

//post    
router.get('/edit', lesson.editLesson)

module.exports = router;