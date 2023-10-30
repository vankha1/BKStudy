const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        sendFrom: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
        sendTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
        sendTime: {
            type: Date,
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

module.exports = mongoose.model('Admin', adminSchema)