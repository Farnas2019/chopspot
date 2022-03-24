const express = require("express");
const path = require("path");
const isLoggedIn = require("../middleware/isLoggedIn");

const multer = require("multer");

var router = express.Router();
// SignUp User 
router.post('/signup');
router.post('/login');
router.patch('/verify');
router.get('/otp');
router.get('/profile');
router.patch('/profile');

module.exports = router;