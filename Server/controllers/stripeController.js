const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Course = require("../models/courseModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");

const intent = async (req, res, next) => {
  try {
    const userId = req.userId;
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "vnd",
      amount: course.price,
      automatic_payment_methods: { enabled: true },
    });

    const order = new Order({
      courseId,
      userId,
      payment_intent: paymentIntent.id,
    });

    await order.save();

    // Send publishable key and PaymentIntent details to client
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      message: "success",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const confirmPayment = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { payment_intent: req.body.payment_intent },
      { $set: { isCompleted: true } }
    );
    const userId = order.userId.toString();
    const courseId = order.courseId.toString();
    // console.log(userId, courseId);

    const course = await Course.findById(courseId);
    if (!course) {
      const error = new Error("Course not found !!");
      error.statusCode = 404;
      throw error;
    }

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found !!");
      error.statusCode = 404;
      throw error;
    }

    user.courses.push({
      courseId: course._id,
      enrolledDate: new Date(),
    });
    await user.save();
    course.numberOfStudent++;
    await course.save();

    res.status(200).json({
      message: "Register course successfully !!!",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  intent,
  confirmPayment,
};
