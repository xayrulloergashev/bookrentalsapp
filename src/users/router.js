const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const Validator = require('./validator');
const UserController = require('./controller');
const authenticate = require('../util/authenticate');

// router.use(authenticate);
router.route('/').post(validate(Validator.addNewUser), UserController.addNew);
router.route('/').get(UserController.getAll);
router.route('/:id').get(UserController.getOne);
router.route('/:id').put(validate(Validator.updateUser), UserController.update);
router
  .route('/:id')
  .delete(validate(Validator.deleteUser), UserController.delete);

module.exports = router;
