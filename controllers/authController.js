const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");

exports.sign_up_get = (req, res) => {
  res.render("sign_up", { title: "Sign Up" });
};

exports.sign_up_post = [
  body("fullname", "Name must not be empty").trim().not().isEmpty().escape(),
  body("username", "Username must not be empty")
    .trim()
    .not()
    .isEmpty()
    .escape(),
  body("pass1", "Password must be at least 8 characters")
    .trim()
    .isLength({ min: 8 })
    .escape(),
  body("pass2", "Passwords must match")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.pass1) {
        throw new Error("Passwords must match");
      }
      return true;
    }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("sign_up", { title: "Sign Up", errors: errors.array() });
      return;
    }
    bcrypt.hash(req.body.pass1, 10, async (err, hashedPassword) => {
      if (err) return next(err);
      const user = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        password: hashedPassword,
        membership_status: "member"
      });
      const result = await user.save();
      res.redirect("/");
    });
  }),
];

exports.log_in_get = (req, res) => {
  if (res.locals.currentUser) return res.redirect('/');
  res.render('log_in', { title: "Log In" })
}

exports.log_in_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
})

exports.log_out = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};