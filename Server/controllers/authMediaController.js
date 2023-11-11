const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const jwt = require('jsonwebtoken');
const User = require("../models/userModel");


const configGoogleAuth = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/google/redirect"
    },
        async (accessToken, refreshToken, profile, cb) => {
            //need to return callback (cb) so that fuction can end and move to callback URL
            console.log("check user: ", profile);
            /*
            const origin = "GOOGLE";
            const dataRaw = {
                fullname: profile.name, 
                email: profile.email   
            }
            let user = await loginMedia(origin, dataRaw);
            */
            return cb(err, null);
        }
    ));
}

const loginMedia = async (origin, dataRaw) => {
    //findOne user, key = email
    //if user exists in db, return user
    //if user doesnt exist in db, create new user to db, return user 
    try{
        let user
        if(origin == "GOOGLE") {
            user = User.findOne({email: dataRaw.email});

        }

        if(!user) {
            //create new user
            const username = dataRaw.name
            const email = dataRaw.email
            const password = "";
            const origin = origin
            const userType = "STUDENT"; //placeholder, to be changed later 
            const joinedDate = new Date();
            const isAdmin = false;

            user = await new User({
                username,
                email,
                password: "",
                userOrigin: origin,
                joinedDate,
                userType,
                isAdmin
              });
             
            const result = await user.save();
        }
        else {
            return user
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    configGoogleAuth,
    loginMedia
}