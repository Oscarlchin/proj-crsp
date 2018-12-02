var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
  program_id: { type: Number, required: true, unique: true },
  eventcomments: [{type: String}]
});

module.exports = mongoose.model('Comment',CommentSchema);
