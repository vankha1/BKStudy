const Message = require("../models/messageModel");

const sendMessage = async (req, res, next) => {
  try {
    const { conversationId, sendFrom, message } = req.body;
    const newMessage = new Message({
      conversationId,
      sendFrom,
      message,
    });

    await newMessage.save();

    res.status(200).json(newMessage);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getConversation = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
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
