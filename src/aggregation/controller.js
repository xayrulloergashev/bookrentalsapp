const BookOrder = require('../bookOrder/model');

module.exports = {
  getAll: async function (req, res, next) {
    try {
      let result = await BookOrder
        // .find({}).populate('books.book');
        .aggregate([
          // {
          //   $group: {
          //     _id: '$user',
          //     totaldocs: { $sum: 1 },
          //   },
          // },
          {
            $sort: { createAt: -1 },
          },
        ]);
      console.log(result);
      // $abs aggregate
      // let result = Math.abs(number);
      // $add aggregate for number
      // let result = number + number;

      if (!result) throw new Error();
      return res.status(200).json(result);
    } catch (error) {
      return next(400, 'xatolik');
    }
  },
};
