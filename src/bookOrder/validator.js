const Joi = require('@hapi/joi');

module.exports = {
  addOrder: {
    body: {
      books: Joi.array().items({
        book: Joi.string().required(),
        amount: Joi.number().default(1),
      }),
      user: Joi.string().required(),
      status: Joi.string().min(3),
    },
  },
  update: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      books: Joi.array().items({
        book: Joi.string().required(),
        amount: Joi.number().default(1),
      }),
      user: Joi.string().required(),
      status: Joi.string().min(3),
    },
  },
  delete: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      reason: Joi.string().required(),
      books: Joi.array().items({
        book: Joi.string().required(),
        amount: Joi.number().required(),
      }),
      user: Joi.string().required(),
      status: Joi.string().min(3),
      canceledDate: Joi.date().default(Date.now()),
    },
  },
  // complatedOrder: {
  //   params: {
  //     id: Joi.string().required(),
  //   },
  //   body: {
  //     books: Joi.array().items({
  //       book: Joi.string().required(),
  //       amount: Joi.number().required(),
  //     }),
  //     user: Joi.string().required(),
  //     status: Joi.string().required(),
  //     complatedDate: Joi.date().default(Date.now()),
  //   },
  // },
  bookAdd: {
    params: {
      id: Joi.string().required(),
    },
    // body: Joi.array().items({
    //   book: Joi.string().required(),
    //   amount: Joi.number().required(),
    // }),
  },
  bookUpdate: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      book: Joi.string().required(),
      amount: Joi.number().required(),
    },
  },
  bookDelete: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      bookId: Joi.string().required(),
      _id: Joi.string().required(),
    },
  },
};
