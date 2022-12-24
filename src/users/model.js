const mongoose = require('mongoose');
// const normalize = require('normalize-mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, minlength: 3 },
    lastname: { type: String, required: true, minlength: 3 },
    age: {
      type: Number,
      min: 11,
      required: true,
    },
    login: { type: String, unique: true },
    username: { type: String, required: true, minlength: 5, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String },
    phone: { type: String, unique: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// UserSchema.plugin(normalize);

module.exports = mongoose.model('users', UserSchema);
