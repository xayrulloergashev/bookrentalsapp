const BookOrder = require('./model');
const Book = require('../book/model');
const BookStock = require('../bookStock/model');
const ErrorHandler = require('../middleware/error');
const CancelOrder = require('../canceledOrder/model');
const ComplatedOrder = require('../complatedOrder/model');
module.exports = {
  addNew: async function (req, res, next) {
    try {
      const body = req.body.books;
      for (let i = 0; i < body.length; i++) {
        let bookS = await BookStock.findById(body[i].book);
        if (bookS.amount > body[i].amount) {
          let Uamount = bookS.amount - body[i].amount;
          let UpdateBookS = await BookStock.findByIdAndUpdate(body[i].book, {
            amount: Uamount,
          }).exec();
        }
      }
      let newbookOrder = new BookOrder(req.body);
      let result = await newbookOrder.save();
      if (!result) throw new Error();
      return res.status(201).json(result);
    } catch (error) {
      return next(new ErrorHandler(400, 'Bookstock add error'));
    }
  },
  getAll: async function (req, res, next) {
    try {
      const { page, limit } = req.query;
      let result = await BookOrder.find({})
        .populate([
          {
            path: 'user',
            select: ['-password'],
          },
          {
            path: 'books',
            populate: {
              path: 'book',
              // select: ['-amount', 'price'],
              populate: {
                path: 'book',
                select: ['title', 'author', 'desc'],
                model: 'book',
              },
            },
          },
        ])
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      // await Book.populate(result[0].books, {
      //   path: 'book',
      // });
      // await Book.populate(result[0].books, {
      //   path: 'book.book',
      // });

      // .populate(['books'])
      // .populate({
      //   path: 'books',
      //   populate: {
      //     path: 'book',
      //     select: ['-amount'],
      //     populate: {
      //       path: 'book',
      //       select: ['title', 'author'],
      //       model: 'book',
      //     },
      //   },
      // })
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (error) {
      return next(400, 'xatolik');
    }
  },
  getOne: async function (req, res, next) {
    try {
      let result = await BookOrder.findById(req.params.id)
        .populate({
          path: 'books',
        })
        .populate({
          path: 'user',
          select: ['-password'],
        })
        .exec();
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (error) {
      return next(400, 'xatolik');
    }
  },
  update: async function (req, res, next) {
    try {
      let body = req.body.books;
      let bookO = await BookOrder.findById(req.params.id);
      let i = 0;
      while (i < body.length) {
        if (body[i].amount > bookO.books[i].amount) {
          let stock = await BookStock.findById(body[i].book);
          let son = body[i].amount - bookO.books[i].amount;
          let uamount = stock.amount - son;
          let Ustock = await BookStock.findByIdAndUpdate(body[i].book, {
            amount: uamount,
          });
        } else if (body[i].amount < bookO.books[i].amount) {
          let stoc = await BookStock.findById(bookO.books[i].book);
          let son2 = bookO.books[i].amount - body[i].amount;
          let u2amount = stoc.amount + son2;
          let Ustock2 = await BookStock.findByIdAndUpdate(body[i].book, {
            amount: u2amount,
          });
        }
        i++;
      }
      let result = await BookOrder.findByIdAndUpdate(req.params.id, req.body);
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (error) {
      return next(400, 'xatolik');
    }
  },
  // delete: async function (req, res, next) {
  //   try {
  //     const order = await BookOrder.findById(req.params.id);
  //     const books = order.books;
  //     for (const i of books) {
  //       let amount;
  //       let stock = await BookStock.findById(i.book).exec();
  //       amount = stock.amount + i.amount;
  //       await BookStock.findByIdAndUpdate(i.book, { amount: amount });
  //     }
  //     let newbookOrder = new CancelOrder(req.body);
  //     let canceled = await newbookOrder.save();
  //     let result = await BookOrder.findByIdAndRemove(req.params.id);
  //     if (!result) throw new Error();
  //     return res.status(200).json(result);
  //   } catch (error) {
  //     return next(400, 'xatolik');
  //   }
  // },
  // complatedOrder: async function (req, res, next) {
  //   try {
  //     let orderId = req.params.id;
  //     let result = await BookOrder.findByIdAndRemove(orderId);
  //     if (!result) throw new Error();
  //     let ComOrder = new ComplatedOrder(req.body);
  //     let complated = await ComOrder.save();
  //     return res.status(200).json(result);
  //   } catch (error) {
  //     return next(new ErrorHandler(400, `Error ${error}`));
  //   }
  // },
  booksUpdate: async function (req, res, next) {
    try {
      let respons;
      let result = await BookOrder.findById(req.params.id);
      let books = result.books;
      let bookStock = await BookStock.find({
        _id: req.body.book,
      });
      for (const i of books) {
        let Upamount = req.body.amount - i.amount;
        if (bookStock[0]._id.toString() == i.book.toString()) {
          let upaamount = bookStock[0].amount - Upamount;
          if (upaamount >= 0) {
            respons = await BookOrder.findOneAndUpdate(
              {
                _id: req.params.id,
                'books.book': req.body.book,
              },
              {
                $set: { 'books.$.amount': req.body.amount },
              },
              {
                new: true,
              }
            ).exec();
            if (respons != null) {
              const updateS = await BookStock.findByIdAndUpdate(
                bookStock[0]._id,
                {
                  amount: upaamount,
                }
              ).exec();
            }
          } else {
            return res
              .status(400)
              .send(`Bu book stockda ${bookStock[0].amount} ta qoldi.`);
          }
        }
      }

      if (!result) throw new Error();
      return res.status(200).json(respons);
    } catch (error) {
      return next(new ErrorHandler(400, 'Error'));
    }
  },
  bookAdd: async function (req, res, next) {
    try {
      let doc;
      let addDoc;
      let reqBody = req.body;
      const order = await BookOrder.findById(req.params.id).exec();
      let item = order.books;

      for (const i of reqBody) {
        for (const j of item) {
          const stockDoc = await BookStock.findById(i.book).exec();
          let amount = stockDoc.amount - i.amount;
          if (j.book != i.book && amount >= 0) {
            addDoc = await BookOrder.findOneAndUpdate(
              {
                _id: req.params.id,
                books: {
                  $not: {
                    $elemMatch: { book: i.book },
                  },
                },
              },
              {
                $push: { books: i },
              },
              {
                new: true,
                runValidators: true,
                useFindAndModify: false,
              }
            ).exec();

            if (addDoc != null) {
              const updatestock = await BookStock.findByIdAndUpdate(
                stockDoc._id,
                {
                  amount: amount,
                },
                { new: true }
              ).exec();
            }
          } else if (j.book == i.book && amount >= 0) {
            let addAmout = j.amount + i.amount;

            doc = await BookOrder.findOneAndUpdate(
              {
                _id: req.params.id,
                'books.book': i.book,
              },
              {
                $set: { 'books.$.amount': addAmout },
              },
              {
                new: true,
                runValidators: true,
                useFindAndModify: false,
              }
            ).exec();

            if (doc != null) {
              const updatestock = await BookStock.findByIdAndUpdate(
                stockDoc._id,
                {
                  amount: amount,
                },
                { new: true }
              ).exec();
            }
          } else {
            return res
              .status(400)
              .send(`Bu mahsulot bazada ${stockDoc[0].amount} ta qoldi.`);
          }
        }
      }
      if (addDoc != null) {
        return res.status(200).json(addDoc);
      } else if (doc !== null) {
        return res.status(200).json(doc);
      }
    } catch (err) {
      return next(new ErrorHandler(400, 'Failed to new bookAdd BookOrder'));
    }
  },
  bookDelete: async function (req, res, next) {
    try {
      let deleteOneEs;
      const BookS = await BookStock.find({
        _id: req.body.bookId,
      }).exec();
      const BookO = await BookOrder.findById(req.params.id).exec();
      let books = BookO.books;
      for (const i of books) {
        if (BookS[0]._id.toString() == i.book.toString()) {
          deleteOneEs = await BookOrder.findOneAndUpdate(
            {
              _id: req.params.id,
            },
            {
              $pull: { books: { _id: req.body._id } },
            },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false,
            }
          ).exec();

          if (deleteOneEs != null) {
            let amount = BookS[0].amount + i.amount;

            const updateStock = await BookStock.findByIdAndUpdate(
              BookS[0]._id,
              {
                amount: amount,
              },
              {
                new: true,
              }
            ).exec();
          }
        }
      }
      return res.status(200).json(deleteOneEs);
    } catch (error) {
      return next(new ErrorHandler(400, 'error'));
    }
  },
};
