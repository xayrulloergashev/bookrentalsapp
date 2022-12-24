const express = require('express');
const router = express.Router();
const BStockController = require('./controller');
const validate = require('express-validation');
const Validator = require('./validator');
const authenticate = require('../util/authenticate');

router.use(authenticate);
router.route('/').post(validate(Validator.addBS), BStockController.addNew);
router.route('/').get(BStockController.getAll);
router.route('/:id').get(BStockController.getOne);
router.route('/:id').put(validate(Validator.update), BStockController.update);
router
  .route('/:id')
  .delete(validate(Validator.delete), BStockController.delete);

module.exports = router;
