const express = require('express');
const validate = require('express-validation');
const authenticate = require('../util/authenticate');
const Validator = require('./validate');
const router = express.Router();
const Controller = require('./controller');

router.use(authenticate);

router.route('/').get(Controller.getAll);
router.route('/:id').post(validate(Validator.addNew), Controller.addNew);
router.route('/:id').delete(validate(Validator.delete), Controller.delete);

module.exports = router;
