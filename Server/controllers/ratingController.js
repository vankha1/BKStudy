const Rating = require("../models/ratingModel");
const Course = require("../models/courseModel");

// POST /rating
const postRating = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { rate, courseId, desc } = req.body;

    const existRating = await Rating.find({ userId: userId, courseId: courseId})

    if (existRating){
        const error = new Error('You have already rated')
        error.statusCode = 404;
        throw error;
    }

    const newRating = new Rating({
      courseId,
      userId,
      rate,
      desc
    });

    await newRating.save();

    res.status(200).json(newRating);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // Server error
    }
    next(err);
  }
};

// GET /rating-statistics/:courseId

const getRatingStatistics = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    const rates = await Rating.find({ courseId: courseId }).populate(
      "userId",
      "fullname"
    );

    if (rates.length === 0) {
      res.status(201).json({
        message: "Course not rated",
      });
    } else {
      let sumRating = 0;
      rates.forEach((rate) => {
        sumRating += rate.rate;
      });

      const avgRating = Math.ceil(sumRating / rates.length);

      const course = await Course.findById(courseId);

      course.rating = avgRating;
      await course.save();

      res.status(200).json({
        avgRating: avgRating >= 5 ? 5 : avgRating,
        rates,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // Server error
    }
    next(err);
  }
};

module.exports = {
  postRating,
  getRatingStatistics,
};
