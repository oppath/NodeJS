const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Category', categorySchema);