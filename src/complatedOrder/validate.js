const Joi = require('@hapi/joi');

module.exports = {
  addNew: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      books: Joi.array().items({
        book: Joi.string().required(),
        amount: Joi.number().required(),
      }),
      user: Joi.string().required(),
      status: Joi.string().required(),
      complatedDate: Joi.date().default(Date.now()),
    },
  },
  delete: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      commit: Joi.string().min(3).required(),
    },
  },
};
