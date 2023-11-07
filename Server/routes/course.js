const express = require("express");
const { body } = require("express-validator");

const courseController = require("../controllers/courseController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/", courseController.getAllCourses);

router.get("/course-detail/:courseId", courseController.getCourse)
// routes for lecturers
router.post(
  "/create",
  isAuth.authToken,
  isAuth.authRoles(["LECTURER"]),
  [
    body("title").trim().isLength({ min: 5 }),
    body("description").trim().isLength({ min: 5 }),
  ],
  courseController.createCourse
);

// router.put(
//   "/:courseId",
//   isAuth.authToken,
//   isAuth.authRoles(["LECTURER"]),
//   courseController.updateCourse
// );

router.delete(
  "/:courseId",
  isAuth.authToken,
  isAuth.authRoles(["LECTURER"]),
  courseController.deleteCourse
);

module.exports = router;
