const mongoose = require('mongoose');

const ComplatedOrderSchema = new mongoose.Schema(
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
    complatedDate: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ComplatedOrder = mongoose.model('complatedOrder', ComplatedOrderSchema);

module.exports = ComplatedOrder;
