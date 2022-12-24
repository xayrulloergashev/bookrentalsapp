const ErrorHandler = require('../middleware/error');
const User = require('./model');
// const nodemailer = require('nodemailer');

module.exports = {
  addNew: async function (req, res, next) {
    try {
      // const { email } = req.body;
      // let mailTransporter = nodemailer.createTransport({
      //   host: 'smtp.gmail.com',
      //   port: 465,
      //   service: 'gmail',
      //   auth: {
      //     user: 'xayrulloergashev02gmail.com',
      //     pass: 'xayrulloergashev02#',
      //   },
      // });

      // let mailDetails = {
      //   from: 'xayrulloergashev02gmail.com',
      //   to: `${email}`,
      //   subject: 'Test mail',
      //   text: 'Node.js testing mail for GeeksforGeeks',
      // };
      // mailTransporter.sendMail(mailDetails, function (err, data) {
      //   if (err) {
      //     console.log(`${err}`);
      //     // return err;
      //   } else {
      //     console.log('Email sent successfully');
      //     // return 'success';
      //   }
      // });
      let newUser = new User(req.body);
      let result = await newUser.save();
      if (!result) throw new Error();
      return res.status(201).json(result);
    } catch (error) {
      return next(new ErrorHandler(400, `${error}`));
    }
  },
  getAll: async function (req, res, next) {
    try {
      const { age } = req.body;
      let name = req.query.firstname;
      // const { page, limit } = req.query;
      let result = await User.find({
        firstname: { $regex: new RegExp(name, 'i') },
        // age: { $gte: age },
      });
      // .limit(limit * 1)
      // .skip((page - 1) * limit);
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (error) {
      return next(new ErrorHandler(400, 'user get error'));
    }
  },
  getOne: async function (req, res, next) {
    try {
      let result = await User
        // aggregate([
        //   {
        //     $project: {
        //       password: 0,
        //     },
        //   },
        // ]);
        .findById(req.params.id);
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (error) {
      return next(new ErrorHandler(400, 'user get one error'));
    }
  },
  update: async function (req, res, next) {
    try {
      let result = await User.findByIdAndUpdate(req.params.id, req.body);
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (error) {
      return next(new ErrorHandler(400, 'user update error'));
    }
  },
  delete: async function (req, res, next) {
    try {
      let result = await User.findByIdAndRemove(req.params.id);
      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (error) {
      return next(new ErrorHandler(400, 'user delete error'));
    }
  },
};
