const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const authRoles =  (permissions) => {
    return async (req, res, next) => {
        const userId = req.userId;

        const user = await User.findById(userId)
        
        if (permissions.includes(user?.userType)) {
            next()
        }
        else{
            res.status(401).json({ message : "You don't have permisson !!!" })
        }
    }
}

const authToken = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader){
        const error = new Error('Not authenticated 1')
        error.statusCode = 401
        throw error
    }
    const token = authHeader.split(' ')[1]
    // console.log(authHeader);
    // console.log(token);
    let decodedPayload;
    try {
        // decode token and payload here is our payload sent from the server in jwt.sign()
        decodedPayload = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    }
    catch (err) {
        err.statusCode = 401;
        throw err
    }
    if (!decodedPayload) {
        const error = new Error('Not authenticated 2')
        error.statusCode = 401
        throw error
    }
    // console.log(decodedPayload);
    req.userId = decodedPayload.userId; // attach userId to token
    next()
}

module.exports = {
    authRoles,
    authToken
}