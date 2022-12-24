const jwt = require('jsonwebtoken');
const bluebird = require('bluebird');
bluebird.promisifyAll(jwt);
const ErrorHandler = require('../middleware/error');

module.exports = async function (req, res, next) {
  const result = req.headers['x-access-token'];
  if (result) {
    // const head = result.split(' ');
    // const headToken = head[1];
    const decoded = await jwt.verifyAsync(result, process.env.TOKEN_SECRET_KEY);
    if (!decoded)
      return next(new ErrorHandler(403, 'Error: Token is not valid'));
    req.user = decoded;
    console.log(decoded);
    return next();
  } else {
    return next(new ErrorHandler(403, 'Error: Not authorized'));
  }
};
