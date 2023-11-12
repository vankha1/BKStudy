const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema(
    {
        contents: {
            type: String,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        lessonId: {
            type: Schema.Types.ObjectId,
            ref: 'Lesson',
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("note", noteSchema);