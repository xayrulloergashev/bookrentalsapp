const Joi = require('@hapi/joi');

module.exports = {
  addNew: {
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
};
