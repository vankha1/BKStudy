const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    background: {
      type: String,
    },
    userType: {
      type: String,
      enum: ['LECTURER', 'STUDENT'],
      required: true
    },
    joinedDate: {
      type: Date,
      required: true
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
            require: true
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
