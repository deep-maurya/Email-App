import { model, Schema } from "mongoose";

const conversation = new Schema({
  senderEmail: {
    type: String,
    required: true,
  },
  receiverEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "closed", "pending"],
    default: "open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const conversationModel = model("conversation",conversation);

module.exports = { conversationModel };