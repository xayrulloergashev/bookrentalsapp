const Joi = require('@hapi/joi');

module.exports = {
  auth: {
    body: {
      login: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
};
