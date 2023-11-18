const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lessonSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
    videoURL: {
      type: String,
    },
    attachedFiles: {
      type: [
        {
          filename: String,
          filepath: String
        }
      ]
    },
    chapter: {
      type: Number
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);
