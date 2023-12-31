const router = require('express').Router();

const convController = require('../controllers/conversationController');
const isAuth = require('../middleware/isAuth');

// new conversation
router.post('/', isAuth.authToken, convController.createConversation);

// get conversation of a user
router.get('/:userId', isAuth.authToken, convController.getUserConversation);

// get conversation of two users
router.get('/find/:firstUserId/:secondUserId', isAuth.authToken, convController.getUserConversation)

module.exports = router