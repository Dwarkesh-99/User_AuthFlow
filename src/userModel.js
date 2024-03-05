// userModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
  userName: { type: String, required: true, trim: true},
  email: { type: String, required: true, unique: true, lowercase: true},
  password: { type: String, required: true, trim: true}
});

const UserSignup = mongoose.model('UserSignup', userSchema);

module.exports = UserSignup;
