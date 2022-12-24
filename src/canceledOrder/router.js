const express = require('express');
const router = express.Router();
const Controller = require('./controller');
const VAlidator = require('./validator');
const validate = require('express-validation');
const authenticate = require('../util/authenticate');

router.use(authenticate);

router.route('/').get(Controller.getAll);
router.route('/:id').post(validate(VAlidator.addNew), Controller.addNew);

module.exports = router;
