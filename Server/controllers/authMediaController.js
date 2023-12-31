require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/userModel");

// const configGoogleAuth = () => {
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      //need to return callback (done) so that fuction can end and move to callback URL
      console.log("check user: ", profile);
      const newUser = {
        googleId: profile.id,
        username: profile.displayName,
        fullname: profile.name.givenName + profile.name.familyName,
        avatar: profile.photos[0].value,
        joinedDate: new Date(),
        email: profile.emails[0].value
      };

      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          done(null, user)
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:8080/auth/facebook/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      //need to return callback (done) so that fuction can end and move to callback URL
      console.log("check user: ", profile);
      const newUser = {
        googleId: profile.id,
        username: profile.displayName,
        fullname: profile.name.givenName + profile.name.familyName,
        avatar: profile.photos[0].value,
        joinedDate: new Date(),
        email: profile.emails[0].value
      };

      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          done(null, user)
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);
// };

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

