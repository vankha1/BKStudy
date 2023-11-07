const express = require("express");

const userController = require('../controllers/userController')
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get('/profile', isAuth.authToken, userController.getProfile)

router.post('/add-profile', isAuth.authToken, userController.addProfile)

router.put('/update-profile', isAuth.authToken, userController.updateProfile)

module.exports = router;