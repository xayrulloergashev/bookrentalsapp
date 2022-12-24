const ComplatedOrder = require('./model');
const BookOrder = require('../bookOrder/model');
const BookStock = require('../bookStock/model');
const ErrorHandler = require('../middleware/error');
module.exports = {
  getAll: async function (req, res, next) {
    try {
      const { limit, page } = req.query;
      let result = await ComplatedOrder.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (err) {
      return next(new ErrorHandler(400, `Error ${err}`));
    }
  },
  addNew: async function (req, res, next) {
    try {
      const order = await BookOrder.findByIdAndRemove(req.params.id).exec();
      let ComOrder = new ComplatedOrder(req.body);
      let complated = await ComOrder.save();
      if (!complated) throw new Error();
      return res.status(200).json(complated);
    } catch (err) {
      return next(new ErrorHandler(400, 'Erroru'));
    }
  },
  delete: async function (req, res, next) {
    try {
      const { commit } = req.body;

      let order = await ComplatedOrder.findById(req.params.id);
      let books = order.books;
      if (commit.length > 0) {
        for (const i of books) {
          const stock = await BookStock.findById(i.book);
          let amount = stock.amount + i.amount;

          let upstock = await BookStock.findByIdAndUpdate(stock._id, {
            amount: amount,
          });

          let result = await ComplatedOrder.findByIdAndDelete(
            req.params.id
          ).exec();
          if (!result) throw new Error();
          return res.status(200).json(result);
        }
      } else {
        return res.status(401).send("sababni jo'nating ");
      }
    } catch (error) {
      return next(new ErrorHandler(400, 'Error compalted order delete'));
    }
  },
};
