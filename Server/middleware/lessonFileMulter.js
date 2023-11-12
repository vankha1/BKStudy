const multer = require('multer');
const path = require('path');

const lessonFileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        //console.log("use filepath:", path.join(__dirname, '../files'));
        cb(null, path.join(__dirname, '../files'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // doing this to prevent overriding file by name,
    }                                                           // basically, time + file is unique                        
});

const uploadLessonFile = multer({
    storage: lessonFileStorage,
    limits: { fileSize: 100 * 1024 * 1024 }, //100MB
    fileFilter: null,
});

module.exports = {
    uploadLessonFile,
}