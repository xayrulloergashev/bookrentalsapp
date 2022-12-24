const Book = require('./model');

module.exports = {
  addNew: async function (req, res, next) {
    try {
      let newBook = new Book(req.body);
      let result = await newBook.save();
      if (!result) throw new Error();
      return res.status(201).json(result);
    } catch (error) {
      return next(400, 'xatolik');
    }
  },
  getAll: async function (req, res, next) {
    try {
      const { page, limit } = req.query;

      let title = req.query.title;
      let result = await Book.find({
        title: { $regex: new RegExp(title, 'i') },
      })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (error) {
      return next(400, 'xatolik');
    }
  },
  getOne: async function (req, res, next) {
    try {
      let result = await Book.findById(req.params.id);
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (error) {
      return next(400, 'xatolik');
    }
  },
  update: async function (req, res, next) {
    try {
      let result = await Book.findByIdAndUpdate(req.params.id, req.body);
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (error) {
      return next(400, 'xatolik');
    }
  },
  delete: async function (req, res, next) {
    try {
      let result = await Book.findByIdAndRemove(req.params.id, req.body);
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (error) {
      return next(400, 'xatolik');
    }
  },
};
