const mongoose = require('mongoose');

const BookOrderSchema = new mongoose.Schema(
  {
    books: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'bookStock',
          required: true,
        },
        amount: { type: Number, default: 1 },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    status: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const BookOrder = mongoose.model('BookOrder', BookOrderSchema);

module.exports = BookOrder;
