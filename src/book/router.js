const express = require('express');
const router = express.Router();
const BookController = require('./controller');
const validate = require('express-validation');
const Validator = require('./validator');
const authenticate = require('../util/authenticate');

router.use(authenticate);
router.route('/').post(validate(Validator.addNewBook), BookController.addNew);
router.route('/').get(BookController.getAll);
router.route('/:id').get(BookController.getOne);
router.route('/:id').put(validate(Validator.updateBook), BookController.update);
router.route('/:id').delete(validate(Validator.delete), BookController.delete);

module.exports = router;
