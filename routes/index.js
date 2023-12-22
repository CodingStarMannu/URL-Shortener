const express = require('express');
const router = express.Router();


const userRoutes = require('./user');
const urlRoutes = require('./url');


router.use('/user', userRoutes);
router.use('/url', urlRoutes);

module.exports = router;