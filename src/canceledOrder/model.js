const mongoose = require('mongoose');

const CancelOrderSchema = new mongoose.Schema(
  {
    reason: { type: String },
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
    canceledDate: { type: Date },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CancelOrder = mongoose.model('canceledOrder', CancelOrderSchema);

module.exports = CancelOrder;
