const router = require('express').Router();

const adminController = require('../controllers/adminController')
const isAuth = require('../middleware/isAuth');

router.get('/courses', isAuth.authToken, isAuth.authRoles('ADMIN') ,adminController.getApprovedCourses);

router.post('/course-approve/:courseId', isAuth.authToken, isAuth.authRoles('ADMIN') , adminController.approveCourse);

router.get('/users', isAuth.authToken, isAuth.authRoles('ADMIN'), adminController.getAllUsers);

router.get('/user/:userId', isAuth.authToken, isAuth.authRoles('ADMIN'), adminController.getDetailUser);

router.delete('/user/delete/:userId', isAuth.authToken, isAuth.authRoles('ADMIN'), adminController.deleteUser)

// router.delete('/course-reject/:courseId', isAuth.authToken, isAuth.authRoles('ADMIN') , adminController.rejectCourse);

module.exports = router;