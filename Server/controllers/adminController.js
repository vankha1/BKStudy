const Course = require("../models/courseModel");
const User = require("../models/userModel");
const Rating = require("../models/ratingModel");

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
    console.log(req.params);
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
    if (!user) {
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

// GET /statistic of user
const getStatUser = async (req, res, next) => {
  try {
    const allCount = await User.countDocuments({ isAdmin: false });

    // get the current date when this function is called
    const currentDate = new Date();

    const currCount = await User.countDocuments({
      isAdmin: false,
      createdAt: {
        // greater than - first day of the current month
        $gt: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0),
        // less than - last day of the current month  
        $lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 24, 0, 0)
      }
    })

    const prevCount = await User.countDocuments({
      isAdmin: false,
      createdAt: {
        // greater than - first day of the previous month  
        $gt: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1, 0, 0, 0),
        // less than - last day of the previous month  
        $lt: new Date(currentDate.getFullYear(), currentDate.getMonth() - 0, 0, 24, 0, 0)
      }
    })

    res.status(200).json({
      allUserCount: allCount,
      newUserThisMonth: currCount,
      newUserLastMonth: prevCount
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

const getStatCourse = async (req, res, next) => {
  try {
    const allCount = await Course.countDocuments({});

    const approvedCount = await Course.countDocuments({
      isApproved: true
    });

    const currentDate = new Date();

    const currCount = await Course.countDocuments({
      isApproved: true,
      createdAt: {
        // greater than - first day of the current month
        $gt: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0),
        // less than - last day of the current month  
        $lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 24, 0, 0)
      }
    })

    const prevCount = await Course.countDocuments({
      isApproved: true,
      createdAt: {
        // greater than - first day of the previous month  
        $gt: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1, 0, 0, 0),
        // less than - last day of the previous month  
        $lt: new Date(currentDate.getFullYear(), currentDate.getMonth() - 0, 0, 24, 0, 0)
      }
    })

    // find course with the most student enrolled in
    const popCourse = await Course.findOne({
      isApproved: true
    })
      .sort("-numberOfStudent")
      .exec();

    //pie 1: >= 4
    //pie 2: <4 && >=3
    //pie 3: <3
    const pie1Tier = await Rating.countDocuments({
      'courseId': popCourse.id,
      rate: {
        $gte: 4
      }
    })
    const pie2Tier = await Rating.countDocuments({
      'courseId': popCourse.id,
      rate: {
        $gte: 3,
        $lt: 4
      }
    })
    const pie3Tier = await Rating.countDocuments({
      'courseId': popCourse.id,
      rate: {
        $lt: 3
      }
    })

    const ratingCount = await Rating.countDocuments({});

    res.status(200).json({
      allCourseCount: allCount,
      approvedCourseCount: approvedCount,
      newCourseThisMonth: currCount,
      newCourseLastMonth: prevCount,
      ratingCount: ratingCount,
      piePortion1: pie1Tier,
      piePortion2: pie2Tier,
      piePortion3: pie3Tier
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
  try {
    const userId = req.params.userId;

    // await User.findById(userId).deleteOne();

    await Course.deleteMany({ createdBy: userId });

    const user = await User.findById(userId);
    if (!user) {
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
  statisticsByMonth,
  getStatUser,
  getStatCourse
};
