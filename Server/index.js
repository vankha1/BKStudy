const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
const cookieSession = require("cookie-session");
const PORT = process.env.PORT || 4000;

const errorHandlingMiddleware = require("./middleware/errorHandling");
const dbConnect = require("./config/db");
const auth = require("./routes/auth");
const course = require("./routes/course");
const chapter = require("./routes/chapter");
const lesson = require("./routes/lesson");
const discussion = require("./routes/discussion");
const lessonFileMulter = require("./middleware/lessonFileMulter");
const stripe = require("./routes/stripe");
const admin = require("./routes/admin");
const conversation = require("./routes/conversation");
const authMedia1 = require("./routes/authMedia");
const authMedia2 = require("./controllers/authMediaController");

const user = require("./routes/user");

dbConnect();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  cookieSession({ name: "session", keys: ["bkstudy"], maxAge: 5 * 60 * 1000 })
);

app.use(passport.initialize());
app.use(passport.session());

// authMedia2.configGoogleAuth();
app.use("/", authMedia1);
app.use("/api/v1/admin", admin);
app.use("/api/v1/order", stripe);
app.use("/api/v1/auth", auth);
app.use("/api/v1/course", course);
app.use("/api/v1/discussion", discussion);
app.use("/api/v1/chapter", chapter);
app.use("/api/v1/lesson", lesson);
app.use("/api/v1/user", user);
app.use("/api/v1/conversation", conversation);

app.use(errorHandlingMiddleware);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
