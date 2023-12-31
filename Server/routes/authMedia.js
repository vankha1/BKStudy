const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/auth/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
  else{
    res.status(401).json({
      message: "Error"
    })
  }
});

router.get("/auth/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { successRedirect: 'http://localhost:3000/', failureRedirect: "/auth/login/failed" })
);


router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["profile", "email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { successRedirect: 'http://localhost:3000/', failureRedirect: "/auth/login/failed" })
);

module.exports = router;
