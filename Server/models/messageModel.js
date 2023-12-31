const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: 'Conversation'
        },
        sendFrom: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
        message: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Message', messageSchema)