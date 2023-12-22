const express = require('express');
const router = express.Router();
const { generateShortUrl, redirectUrl } = require('../controllers/urlController');
const passport = require('../config/passport-local-strategy');

// Middleware to check if the user is authenticated
const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Authentication required' });
};


router.post('/shorten', isAuthenticated, generateShortUrl);


router.get('/:shortUrl', isAuthenticated, redirectUrl);

module.exports = router;
