var express = require('express');
var router = express.Router()

const indexController = require("../controllers/indexController");
const authController = require("../controllers/authController")

// Home Page
router.get('/', indexController.home);

// Sign Up
router.get('/sign-up', authController.sign_up_get);
router.post('/sign-up', authController.sign_up_post);

// Log In
router.get('/log-in', authController.log_in_get);
router.post('/log-in', authController.log_in_post);

// Log Out
router.get('/log-out', authController.log_out);

module.exports = router;
