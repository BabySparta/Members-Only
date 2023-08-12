const asyncHandler = require("express-async-handler");
const Message = require("../models/Message");
const { body, validationResult } = require("express-validator");

exports.create_message_get = asyncHandler((req, res) => {
  res.render("create_message", {
    title: "Create Message",
    user: res.locals.currentUser,
  });
});

exports.create_message_post = [
  body("title", "Title must not be empty").trim().not().isEmpty().escape(),
  body("message", "Message must not be empty").trim().not().isEmpty().escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("create_message", {
        title: "Create Message",
        user: res.locals.currentUser,
        errors: errors.array(),
      });
      return;
    }
    const message = new Message({
      user: res.locals.currentUser,
      title: req.body.title,
      message: req.body.message,
      fulldate: Date.now
    })
    const result = await message.save();
    res.redirect("/");
  }),
];
