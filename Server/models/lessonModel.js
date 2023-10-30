const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lessonSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
    },
    contents: {
      type: Object,
      required: true,
    },
    url: {
      type: String
    },
    noteContents: {
      type: String
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);
