const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const User = require("../models/userModel");
const authController = require("../controllers/authController");


router.put(
  "/signup",
  [
    body("username").trim().not().isEmpty(),
    body("email")
      .isEmail()
      .withMessage("Please enter your email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email address already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 6 })
  ],
  authController.signup
);

router.post("/login", authController.login);


module.exports = router;
