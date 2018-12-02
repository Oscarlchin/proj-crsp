var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  favevents:[{type: Number}]
});

module.exports = mongoose.model('User',UserSchema);
