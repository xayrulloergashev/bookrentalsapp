const Joi = require('@hapi/joi');

module.exports = {
  addBS: {
    body: {
      book: Joi.string().required(),
      amount: Joi.number().default(0),
      price: Joi.number().required(),
    },
  },
  update: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      book: Joi.string().required(),
      amount: Joi.number().default(0),
      price: Joi.number().required(),
    },
  },
  delete: {
    params: {
      id: Joi.string().required(),
    },
  },
};
