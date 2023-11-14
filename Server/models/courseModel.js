const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    numberOfStudent: {
      type: Number
    },
    chapters: {
      type: [
        {
          name: String,
          lessons: [
            {
              lessonId: {
                type: Schema.Types.ObjectId,
                ref: "Lesson",
              },
            },
          ],
        },
      ]
    },
    price: {
      type: Number,
      required: true,
    },
    numberOfVideo: {
      type: Number,
    },
    duration: {
      type: Number,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
