const Course = require("../models/courseModel");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    background: {
      type: String,
    },
    userType: {
      type: String,
      enum: ["LECTURER", "STUDENT", "ADMIN"],
      // required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    joinedDate: {
      type: Date,
      required: true,
    },
    courses: {
      type: [
        {
          courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course",
          },
          enrolledDate: {
            type: Date,
            require: true,
          },
        },
      ],
      required: true,
    },
    googleId: {
      type: String
    },
    token: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.pre(
  "deleteOne",
  { query: true, document: false },
  async function (next) {
    const user = this;
    await Course.deleteMany({ createdBy: user._id.toString() });
    next();
  }
);

module.exports = mongoose.model("User", userSchema);
