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
    attachedFileCount: {
      type: Number,
      required: true
    },
    attachedFiles: {
      type: [
        {
          filename: String,
          filepath: String
        }
      ]
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);
