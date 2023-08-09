var express = require('express');
var router = express.Router()

const indexController = require("../controllers/indexController");

// Home Page
router.get('/', indexController.home);

module.exports = router;
