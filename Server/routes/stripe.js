require("dotenv").config();
const router = require("express").Router();

const isAuth = require("../middleware/isAuth");
const stripeController = require("../controllers/stripeController");

router.post(
  "/create-payment-intent/:courseId",
  isAuth.authToken,
  isAuth.authRoles(["STUDENT"]),
  stripeController.intent
);

router.put(
  "/",
  isAuth.authToken,
  isAuth.authRoles(["STUDENT"]),
  stripeController.confirmPayment
);

module.exports = router;
