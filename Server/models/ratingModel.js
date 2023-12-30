const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratingSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rate: {
      type: Number,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", ratingSchema);
