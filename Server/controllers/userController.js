const User = require("../models/userModel");

const getProfile = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user){
        const error = new Error('User not found !!');
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({ user })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // Server error
    }
    next(err);
  }
};

const updateProfile = async (req, res, next) => {

}

module.exports = {
  getProfile,
  updateProfile
};
