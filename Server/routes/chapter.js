const express = require('express');
const chapterController = require('../controllers/chapterController');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.post('/create',
    isAuth.authToken,
    isAuth.authRoles(['LECTURER']),
    chapterController.createChapter
);

router.put('/update',
    isAuth.authToken,
    isAuth.authRoles(['LECTURER']),
    chapterController.updateChapter
)

router.delete('/delete',
    isAuth.authToken,
    isAuth.authRoles(['LECTURER']),
    chapterController.deleteChapter
)

module.exports = router;