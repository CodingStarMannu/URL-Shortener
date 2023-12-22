const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');
const userController = require('../controllers/userController');

// User Signup Route
router.post('/signup', userController.signup);

// User Login Route
router.post('/login', userController.login);


module.exports = router;
