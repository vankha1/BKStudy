const express = require("express")
const router = express.Router();
const authMedia = require("../controllers/authMediaController")

router.get("/", authMedia.passport.authenticate("google", {
    scope: ["profile", "email"]
}))

router.get("/redirect",
    /*
        authMedia.passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            // Successful authentication, redirect home.
        }
    */
    //authMedia.passport.authenticate('google'),
    (req, res) => { res.send("login success") }
)

module.exports = router