const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, minlength: 2, unique: true, required: true },
    author: { type: String, minlength: 3, unique: true, required: true },
    desc: { type: String, maxlength: 1000 },
    // images: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Book = mongoose.model('book', BookSchema);

module.exports = Book;
