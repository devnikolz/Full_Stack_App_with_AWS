const mongoose = require('mongoose');

const linkIdSchema = new mongoose.Schema({
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link'
  },
  count: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('LinkId', linkIdSchema);
