const CancelOrder = require('./model');
const ErrorHandler = require('../middleware/error');
const BookOrder = require('../bookOrder/model');

module.exports = {
  addNew: async function (req, res, next) {
    const order = await BookOrder.findById(req.params.id);
    const books = order.books;
    for (const i of books) {
      let amount;
      let stock = await BookStock.findById(i.book).exec();
      amount = stock.amount + i.amount;
      await BookStock.findByIdAndUpdate(i.book, { amount: amount });
    }
    let newbookOrder = new CancelOrder(req.body);
    let canceled = await newbookOrder.save();
    let result = await BookOrder.findByIdAndRemove(req.params.id);
    if (!result) throw new Error();
    return res.status(200).json(canceled);
  },
  getAll: async function (req, res, next) {
    try {
      const { page, limit } = req.query;
      let result = await CancelOrder.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (err) {
      return next(new ErrorHandler(400, `Error ${err}`));
    }
  },
};
