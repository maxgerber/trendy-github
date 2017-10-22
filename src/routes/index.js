const express = require('express');
const dummyData = require('../../tests/dummy-data.json');

const router = express.Router();

const home = require('./home');

router.get('/', home.get);

module.exports = router;
