require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
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
      // console.log("check user: ", accessToken);
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

          const token = jwt.sign(
            {
              email: profile.emails[0].value,
              userId: user._id.toString(),
              userType: '',
            },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: "1d" }
          );

          user.token = token;

          await user.save()

          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: "http://localhost:8080/auth/facebook/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       //need to return callback (done) so that fuction can end and move to callback URL
//       // console.log("check user: ", accessToken);
//       console.log("----------", profile)
      

//       const newUser = {
//         googleId: profile.id,
//         username: profile.displayName,
//         fullname:  profile.name.familyName + profile.name.givenName,
//         avatar: profile.photos[0].value,
//         joinedDate: new Date(),
//         email: profile.emails[0].value
//       };

//       try {
//         let user = await User.findOne({ googleId: profile.id });

//         if (user) {
//           done(null, user)
//         } else {
//           user = await User.create(newUser);

//           // // user.token = token;

//           // await user.save()
//           done(null, user);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   )
// );
// };

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

