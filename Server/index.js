const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 4000

const errorHandlingMiddleware = require('./middleware/errorHandling')
const dbConnect = require('./config/db')
const auth = require('./routes/auth')

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

app.use('/api/v1/auth', auth);

// app.use('/api', (req, res) => {
//     res.json({ test : "OK" })
// })


app.use(errorHandlingMiddleware)

app.listen(PORT, () => console.log( `Server listening at http://localhost:${PORT}`))