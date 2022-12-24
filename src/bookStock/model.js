const mongoose = require('mongoose');

const BookStockSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'book',
      required: true,
    },
    amount: { type: Number, default: 0 },
    price: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BookStock = mongoose.model('bookStock', BookStockSchema);

module.exports = BookStock;
