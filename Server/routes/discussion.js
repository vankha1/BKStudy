const express = require("express");
const router = express.Router();

const discussionController = require('../controllers/discussionController');
const isAuth = require("../middleware/isAuth");

router.get('/:courseId',isAuth.authToken, isAuth.authRoles(["LECTURER", "STUDENT"]), discussionController.getAllDiscussions);

router.post('/:courseId/create', isAuth.authToken, isAuth.authRoles(["LECTURER", "STUDENT"]), discussionController.createDiscussion);

router.get('/:courseId/:discussionId', isAuth.authToken, isAuth.authRoles(["LECTURER", "STUDENT"]), discussionController.getDiscussion);

router.post('/:courseId/:discussionId/createReply', isAuth.authToken, isAuth.authRoles(["LECTURER", "STUDENT"]), discussionController.createReplyMessage);

router.delete('/:courseId/:discussionId/deleteReply/:replyId', isAuth.authToken, isAuth.authRoles(["LECTURER", "STUDENT"]), discussionController.deleteReplyMessage);

module.exports = router