const ErrorHandler = require('../middleware/error');

module.exports = (...allowed) => {
  const isAllowed = function (role) {
    return allowed.indexOf(role) > -1;
  };

  return function (req, res, next) {
    if (req.identifier && isAllowed(req.identifier.role)) {
      return next();
    } else {
      return next(new ErrorHandler(403, 'Forbidden permisson'));
    }
  };
};
