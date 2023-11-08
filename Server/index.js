const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 4000

const errorHandlingMiddleware = require('./middleware/errorHandling')
const dbConnect = require('./config/db')
const auth = require('./routes/auth')
const course = require('./routes/course')

const lesson = require('./routes/lesson')
const lessonFileMulter = require('./middleware/lessonFileMulter')

//const authMedia1 = require('./routes/authMedia')
//const authMedia2 = require('./controllers/authMediaController')

//authMedia2.configGoogleAuth()

const user = require('./routes/user')


dbConnect()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/images", express.static(path.join(__dirname, "images")));

app.get('/', (req, res) => {
    res.send("homepage")
})
app.use('/api/v1/auth', auth);
app.use('/api/v1/course', course);

//app.use('/google', authMedia1);
app.use('/api/v1/lesson', lesson);
app.use('/api/v1/user', user);


app.use(errorHandlingMiddleware)

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`))