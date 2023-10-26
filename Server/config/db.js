const mongoose = require('mongoose')

const dbConnect = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connect databse successfully !!!")
    }
    catch(err){
        console.log("Error connecting !!!")
    }
}

module.exports = dbConnect