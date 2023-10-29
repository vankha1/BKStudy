const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique : true
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    userType : {
      type : String,
      enum : ['LECTURER', 'STUDENT'],
      required: true
    },
    courses: {
      type: [
        {
          courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course",
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
