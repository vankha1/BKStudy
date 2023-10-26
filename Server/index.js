const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4000

const dbConnect = require('./config/db')

dbConnect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', (req, res) => {
    res.json({ test : "OK" })
})


app.listen(PORT, () => console.log( `Server listening at http://localhost:${PORT}`))