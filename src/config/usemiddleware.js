const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
// const morgan = require('morgan');

module.exports = function (app) {
  // app.use(morgan('tiny'));
  app.use(helmet());
  app.use(compression());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};
