const Discussion = require("../models/discussionModel");
const mongoose = require("mongoose");

// GET /:courseId
const getAllDiscussions = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    const discussions = await Discussion.find({ courseId: courseId }).populate(
      "createdBy",
      "fullname -_id"
    );

    res.status(200).json({
      discussions,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// POST /:courseId/create
const createDiscussion = async (req, res, next) => {
  try {
    const userId = req.userId;
    const courseId = req.params.courseId;
    const { title, content } = req.body;

    if (title.length < 6 || content.length < 6) {
      const error = new Error("Title or content must be at least 6");
      error.statusCode = 404;
      throw error;
    }

    const discussion = new Discussion({
      title,
      content,
      createdBy: userId,
      courseId,
      replies: [],
    });

    await discussion.save();

    res.status(200).json({
      message: "Discussion created successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getDiscussion = async (req, res, next) => {
  try {
    const discussionId = req.params.discussionId;
    const courseId = req.params.courseId;

    const discussion = await Discussion.findById(discussionId)
      .populate("createdBy", "fullname -_id")
      .populate("replies.createdBy", "fullname");

    if (!discussion) {
      const error = new Error("Discussion not exists");
      error.statusCode = 404;
      throw error;
    }

    if (discussion.courseId.toString() !== courseId) {
      const error = new Error("Discussion not matching course");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      discussion,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// POST /:courseId/:discussionId/createReply
const createReplyMessage = async (req, res, next) => {
  try {
    const userId = req.userId;
    const content = req.body.content;
    const discussionId = req.params.discussionId;
    const courseId = req.params.courseId;

    const discussion = await Discussion.findById(discussionId);

    if (!discussion) {
      const error = new Error("Discussion not exists");
      error.statusCode = 404;
      throw error;
    }

    if (discussion.courseId.toString() !== courseId) {
      const error = new Error("Discussion not matching course");
      error.statusCode = 404;
      throw error;
    }
    const replyMessage = {
      createdBy: userId,
      content,
    };

    discussion.replies.push(replyMessage);

    await discussion.save();

    res.status(200).json({
      message: "Reply message successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// DELETE /:courseId/:discussionId/deleteReply
const deleteReplyMessage = async (req, res, next) => {
  try {
    const userId = req.userId;
    const discussionId = req.params.discussionId;
    const courseId = req.params.courseId;

    const discussion = await Discussion.findById(discussionId)
      .populate("createdBy", "fullname -_id")
      .populate("replies.createdBy", "fullname");

    if (!discussion) {
      const error = new Error("Discussion not exists");
      error.statusCode = 404;
      throw error;
    }

    if (discussion.courseId.toString() !== courseId) {
      const error = new Error("Discussion not matching course");
      error.statusCode = 404;
      throw error;
    }

    const idxUser = discussion.replies.findIndex(reply => reply.createdBy._id.toString() === userId);

    if (idxUser === -1){
        const error = new Error("Not authenticated");
        error.statusCode = 404;
        throw error;
    }
    discussion.replies.splice(idxUser, 1);
    await discussion.save()

    res.status(200).json({
        message: "Delete reply successfully"
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getAllDiscussions,
  createDiscussion,
  getDiscussion,
  createReplyMessage,
  deleteReplyMessage,
};
