const router = require('express').Router();

const messageController = require('../controllers/messageController');
const isAuth = require('../middleware/isAuth');

router.post('/', isAuth.authToken , messageController.sendMessage);

router.get('/:conversationId', isAuth.authToken, messageController.getConversation);

module.exports = router