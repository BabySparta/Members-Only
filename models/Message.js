const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const MessageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, maxLength: 50 },
  message: { type: String, required: true, maxLength: 500 },
  fullDate: { type: Date, required: true, default: Date.now },
});

MessageSchema.virtual("date").get(function() {
  return DateTime.fromJSDate(this.fullDate).toFormat("HH:mm LLL dd, yyyy");
})

module.exports = mongoose.model("Message", MessageSchema);
