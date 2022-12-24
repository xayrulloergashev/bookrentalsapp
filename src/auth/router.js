const router = require('express').Router();
const Controller = require('./controller');
const validate = require('express-validation');
const Validator = require('./validator');

router.route('/').post(validate(Validator.auth), Controller.auth);

module.exports = router;
