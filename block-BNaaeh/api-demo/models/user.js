let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  books: { type: mongoose.Types.ObjectId, ref: 'Book' },
  comments: { type: mongoose.Types.ObjectId, ref: 'Comment' },
});

module.exports = mongoose.model('User', userSchema);
