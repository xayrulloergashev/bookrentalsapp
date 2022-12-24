const express = require('express');
const router = express.Router();
const Aggregation = require('./controller');

router.route('/').get(Aggregation.getAll);
module.exports = router;
