const express = require("express");
const { body } = require("express-validator");

const courseController = require("../controllers/courseController");
const isAuth = require("../middleware/isAuth");
const imageMulterMiddleware = require('../middleware/imageMulter');

const router = express.Router();

// used for home page
router.get("/", courseController.getAllCourses);

// used for guest
router.get("/course-detail/:courseId", courseController.getCourse)


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
