const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const BookOrderController = require('./controller');
const Validator = require('./validator');
const authenticate = require('../util/authenticate');

router.use(authenticate);
router
  .route('/')
  .post(validate(Validator.addOrder), BookOrderController.addNew);
router.route('/').get(BookOrderController.getAll);
router.route('/:id').get(BookOrderController.getOne);
router
  .route('/:id')
  .put(validate(Validator.update), BookOrderController.update);
// router
//   .route('/:id')
//   .delete(validate(Validator.delete), BookOrderController.delete);
// router
//   .route('/complated/:id')
//   .delete(
//     validate(Validator.complatedOrder),
//     BookOrderController.complatedOrder
//   );
router
  .route('/bookUpdate/:id')
  .put(validate(Validator.bookUpdate), BookOrderController.booksUpdate);
router
  .route('/bookAdd/:id')
  .put(validate(Validator.bookAdd), BookOrderController.bookAdd);
router
  .route('/bookDelete/:id')
  .put(validate(Validator.bookDelete), BookOrderController.bookDelete);

module.exports = router;
