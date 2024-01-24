const Conversation = require("../models/conversationModel");

// POST /
const createConversation = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
    });

    if (conversations.length !== 0) {
      res.status(201).json({
        message: "Have created",
      });
      return;
    }

    const conversation = new Conversation({
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
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
    const userId = req.userId;

    const conversations = await Conversation.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .populate("receiverId", "fullname avatar")
      .populate("senderId", "fullname avatar");

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
