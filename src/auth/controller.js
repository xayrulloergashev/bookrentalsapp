const ErrorHandler = require('../middleware/error');
const jwt = require('jsonwebtoken');
const bluebird = require('bluebird');
bluebird.promisifyAll(jwt);
const User = require('../users/model');

module.exports = {
  auth: async function (req, res, next) {
    try {
      let result = await User.findOne({ login: req.body.login }).exec();
      if (!result) {
        return res.status(404).json('user is not found');
      }
      if (result.password === req.body.password) {
        const token = jwt.sign(
          {
            _id: result._id,
            name: {
              username: result.username,
              login: result.login,
            },
            role: result.role,
          },
          process.env.TOKEN_SECRET_KEY,
          {
            algorithm: 'HS256',
            expiresIn: process.env.TOKEN_EXPIRESIN,
          }
        );
        return res.status(200).json({ token });
      }
      return res.status(403).json('password is topilmadi !!!');
    } catch (error) {
      return next(new ErrorHandler(403, 'Forbidden access'));
    }
  },
};
