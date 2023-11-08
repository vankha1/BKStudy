const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../images'));
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
};

//.single(fieldname) : Accept a single file with the name fieldname. The single file will be stored in req.file.
const uploadImage = multer({
    storage: imageStorage,
    limits: { fileSize: 10 * 1024 * 1024 }, //10MB
    fileFilter: fileFilter
}).single("image");

module.exports = uploadImage