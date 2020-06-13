const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bannerSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
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

module.exports = mongoose.model('Banner', bannerSchema);