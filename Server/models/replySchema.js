const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const replySchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ReplyMessage', replySchema);