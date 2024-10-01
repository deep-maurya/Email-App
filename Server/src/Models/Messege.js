const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "conversation",
      required: true,
    },
    senderEmail: {
        type: String,
        required: true,
    },
    receiverEmail: {
        type: String,
        required: true,
    },
    message: {
      type: String,
      required: true,
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
});
  
const MessageModel = model("message", messageSchema);
module.exports = { MessageModel };
  