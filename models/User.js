const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const membershipStatus = ["member", "club_member", "admin"];

const UserSchema = new Schema({
  full_name: { type: String, required: true, maxLength: 100 },
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
  membership_status: { type: String, required: true, enum: membershipStatus },
});

module.exports = mongoose.model("Member", UserSchema);
