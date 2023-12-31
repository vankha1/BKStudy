const Conversation = require("../models/conversationModel");

// POST /
const createConversation = async (req, res, next) => {
  try {
    const conversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });

    await conversation.save();

    res.status(200).json(conversation);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET /:userId
const getUserConversation = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const conversations = await Conversation.find({
      members: { $in: [userId] },
    });

    res.status(200).json(conversations);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET /find/:firstUserId/:secondUserId
const getConversationsOfTwo = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  createConversation,
  getUserConversation,
  getConversationsOfTwo,
};
