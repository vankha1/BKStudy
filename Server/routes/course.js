const express = require("express");
const { body } = require("express-validator");

const courseController = require("../controllers/courseController");
const ratingController = require("../controllers/ratingController");
const isAuth = require("../middleware/isAuth");
const imageMulterMiddleware = require('../middleware/imageMulter');

const router = express.Router();

// Rating the course
router.post('/rating', isAuth.authToken, isAuth.authRoles(['STUDENT']), ratingController.postRating)

router.get('/rating-statistics/:courseId', isAuth.authToken, isAuth.authRoles(['LECTURER']), ratingController.getRatingStatistics)


// used for home page
router.get("/", courseController.getAllCourses);

// used for guest
router.post('/search', courseController.searchCourse);

// used for guest
router.get("/course-detail/:courseId", courseController.getCourse)

// get students in course
router.get("/students/:courseId", isAuth.authToken ,courseController.getStudents)

// view student in detail
router.get("/:courseId/:detailUserId", isAuth.authToken ,courseController.getStudent)

// used for lecturers
router.post(
  "/create",
  isAuth.authToken,
  isAuth.authRoles(["LECTURER"]),
  imageMulterMiddleware,
  [
    body("title").trim().isLength({ min: 5 }),
    body("description").trim().isLength({ min: 5 }),
  ],
  courseController.createCourse
);

router.delete(
  "/:courseId",
  isAuth.authToken,
  isAuth.authRoles(["LECTURER"]),
  courseController.deleteCourse
);


// router.put(
//   "/:courseId",
//   isAuth.authToken,
//   isAuth.authRoles(["LECTURER"]),
//   courseController.updateCourse
// );

module.exports = router;
