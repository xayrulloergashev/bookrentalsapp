const ErrorHandler = require('../middleware/error');
const BookStock = require('./model');
module.exports = {
  addNew: async function (req, res, next) {
    try {
      let newStock = new BookStock(req.body);
      let result = await newStock.save();
      if (!result) throw new Error();
      return res.status(201).json(result);
    } catch (error) {
      return next(new ErrorHandler(400, 'Bookstock add error'));
    }
  },
  getAll: async function (req, res, next) {
    const { min, max } = req.body;
    try {
      const { page, limit } = req.query;
      let result = await BookStock.find({
        price: { $gte: min, $lte: max },
      })
        .populate({
          path: 'book',
        })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (error) {
      return next(new ErrorHandler(400, 'Bookstock get error'));
    }
  },
  getOne: async function (req, res, next) {
    try {
      let result = await BookStock.findById(req.params.id).populate({
        path: 'book',
      });
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (error) {
      return next(new ErrorHandler(400, 'Bookstock get one error'));
    }
  },
  update: async function (req, res, next) {
    try {
      let result = await BookStock.findByIdAndUpdate(
        req.params.id,
        req.body
      ).populate({
        path: 'book',
      });
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (error) {
      return next(new ErrorHandler(400, 'Bookstock update error'));
    }
  },
  delete: async function (req, res, next) {
    try {
      let result = await BookStock.findByIdAndRemove(req.params.id).populate({
        path: 'book',
      });
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (error) {
      return next(new ErrorHandler(400, 'Bookstock delete error'));
    }
  },
};
