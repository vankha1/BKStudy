const Course = require("../models/courseModel");
const User = require("../models/userModel");

// GET /api/v1/admin/courses
const getApprovedCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ isApproved: false })
      .populate("createdBy", "fullname -_id")
      .select("title price description imageUrl");

    res.status(200).json({
      courses,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// POST /api/v1/admin/course-approve/:courseId
const approveCourse = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      const error = new Error("Course not found");
      error.statusCode = 404;
      throw error;
    }

    if (course.isApproved) {
      res.status(200).json({
        message: "Course is already approved !!!",
      });
    } else {
      course.isApproved = true;
      await course.save();

      const user = await User.findById(course.createdBy.toString());
      user.courses.push({
        courseId: course._id,
        enrolledDate: new Date(),
      });
      await user.save();

      res.status(200).json({
        message: "Approved course successfully",
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET /users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isAdmin: false }).select("fullname username joinedDate");

    res.status(200).json({ users });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET /user/:userId
const getDetailUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate('courses.courseId', 'title');
    if (!user){
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ user })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

// GET /statistic/:month 
const statisticsByMonth = async (req, res, next) => {
  try {
    const users = await User.find({ isAdmin: false }).select("fullname username joinedDate");

    const filteredUsers = users.filter(user => user.joinedDate.toISOString().substring(5, 7) === req.params.month)

    // console.log(filteredUsers);
    // console.log(filteredUsers.length / users.length);

    res.status(200).json({
      byMonth: filteredUsers.length / users.length * 100
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

// DELETE /user/delete/:userId
const deleteUser = async (req, res, next) => {
  try{
    const userId = req.params.userId;

    // await User.findById(userId).deleteOne();

    await Course.deleteMany({ createdBy: userId });

    const user = await User.findById(userId);
    if (!user){
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // await Course.deleteMany({ createdBy: user._id.toString() })
    await user.deleteOne();

    res.status(200).json({
      message: 'User deleted successfully'
    })


  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}


module.exports = {
  getApprovedCourses,
  approveCourse,
  getAllUsers,
  getDetailUser,
  deleteUser,
  statisticsByMonth
};
