const asyncHandler = require("express-async-handler");
const Message = require("../models/Message");

exports.home = asyncHandler(async (req, res) => {
  const messages = Message.find({});
  res.render("index", {
    title: "Noble Circle Society",
    user: req.user,
    messages: messages,
  });
});
