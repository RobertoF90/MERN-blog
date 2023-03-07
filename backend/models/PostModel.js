const mongoose = require('mongoose');

const Post = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Post', Post);
