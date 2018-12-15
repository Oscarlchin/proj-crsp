// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  favevents:[{type: Number}]
});

module.exports = mongoose.model('User',UserSchema);
