const Joi = require('@hapi/joi');

module.exports = {
  addNewBook: {
    body: {
      title: Joi.string().min(2).required(),
      author: Joi.string().min(3).required(),
      desc: Joi.string().max(1000),
      // images: Joi.string()
      //   .valid('image/png', 'image/jpeg', 'image/jpg')
      //   .required(),
    },
  },
  updateBook: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      title: Joi.string().min(2).required(),
      author: Joi.string().min(3).required(),
      desc: Joi.string().max(1000),
      // images: Joi.string()
      //   .valid('image/png', 'image/jpeg', 'image/jpg')
      //   .required(),
    },
  },
  delete: {
    params: {
      id: Joi.string().required(),
    },
  },
};
