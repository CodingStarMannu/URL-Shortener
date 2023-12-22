const express = require('express');
const router = express.Router();
const {generateShortUrl, redirectUrl} = require('../controllers/urlController');


router.post('/shorten', generateShortUrl);
router.get('/:shortUrl', redirectUrl);



module.exports = router;