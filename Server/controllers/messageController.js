const Message = require("../models/messageModel");
const mongoose = require("mongoose");
// POST /
const sendMessage = async (req, res, next) => {
  try {
    const { conversationId, sendFrom, sendTo, message } = req.body;
    const newMessage = new Message({
      conversationId: new mongoose.Types.ObjectId(conversationId),
      sendFrom: new mongoose.Types.ObjectId(sendFrom),
      sendTo: new mongoose.Types.ObjectId(sendTo),
      message,
    });

    await newMessage.save();

    const goodMessage = await Message.findById(newMessage._id)
      .populate("sendFrom", "fullname avatar")
      .populate({
        path: "conversationId",
        select: "receiverId",
        populate: {
          path: "receiverId",
          select: "fullname",
        },
      });

    res.status(200).json(goodMessage);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET /:conversationId
const getConversation = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    })
      .populate("sendFrom", "fullname avatar")
      .populate({
        path: "conversationId",
        select: "receiverId",
        populate: {
          path: "receiverId",
          select: "fullname",
        },
      });

    res.status(200).json(messages);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  sendMessage,
  getConversation,
};
