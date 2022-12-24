const Joi = require('@hapi/joi');

module.exports = {
  addNewUser: {
    body: Joi.object({
      firstname: Joi.string().min(3).required(),
      lastname: Joi.string().min(3).required(),
      age: Joi.number().min(11).required(),
      username: Joi.string().min(5).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(16).required(),
      login: Joi.string().min(8).required(),
      role: Joi.string().required(),
      phone: Joi.string().max(13),
    }),
  },
  updateUser: {
    params: {
      id: Joi.string().required(),
    },
    body: Joi.object({
      firstname: Joi.string().min(3).required(),
      lastname: Joi.string().min(3).required(),
      age: Joi.number().min(11).required(),
      username: Joi.string().min(5).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(16).required(),
      login: Joi.string().min(8).required(),
      role: Joi.string().required(),
      phone: Joi.string().max(13),
    }),
  },
  deleteUser: {
    params: {
      id: Joi.string().required(),
    },
  },
};
