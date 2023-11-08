const express = require("express");

const userController = require('../controllers/userController')
const isAuth = require("../middleware/isAuth");
const imageMulterMiddleware = require('../middleware/imageMulter');

const router = express.Router();

router.get('/profile', isAuth.authToken, userController.getProfile)

router.post('/add-profile', isAuth.authToken, imageMulterMiddleware, userController.addProfile)

router.put('/update-profile', isAuth.authToken, imageMulterMiddleware, userController.updateProfile)

router.post('/register/:courseId', isAuth.authToken, isAuth.authRoles(['STUDENT']), userController.registerCourse)

router.get('/courses', isAuth.authToken, isAuth.authRoles(['STUDENT', 'LECTURER']), userController.getCourses)

module.exports = router;