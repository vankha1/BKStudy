const express = require("express");
const router = express.Router();
const passport = require("passport");
const authMediaController = require("../controllers/authMediaController");

router.get("/auth/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  } else {
    res.status(401).json({
      message: "Error",
    });
  }
});

router.get("/auth/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.post("/logout", function (req, res) {
  console.log(123)
  res.clearCookie('session');
  return res.status(200).json({
    message: "Logout successful"
  })
  // res.redirect('http://localhost:3000')
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login/failed",
  }),
  authMediaController.loginByGoogle
);

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["profile", "email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
