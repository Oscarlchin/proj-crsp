// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
  program_id: { type: Number, required: true, unique: true },
  eventcomments: [{
    username: String,
    usercomment: String }]
});

module.exports = mongoose.model('Comment',CommentSchema);
