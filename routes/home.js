const express = require('express')

const {indexView} = require('../controllers/home.controller');

const router = express.Router();

router.get('/', indexView);

module.exports = router
