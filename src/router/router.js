const express = require('express');
const router = express.Router();
const Book = require('../book/router');
const User = require('../users/router');
const BookOrder = require('../bookOrder/router');
const BookStock = require('../bookStock/router');
const CancelOrder = require('../canceledOrder/router');
const ComplatedOrder = require('../complatedOrder/router');
const Auth = require('../auth/router');
const Aggregation = require('../aggregation/router');

router.use('/auth', Auth);
router.use('/canceledorder', CancelOrder);
router.use('/complatedorder', ComplatedOrder);
router.use('/books', Book);
router.use('/users', User);
router.use('/bookstock', BookStock);
router.use('/bookorder', BookOrder);
router.use('/aggregation', Aggregation);

module.exports = router;
