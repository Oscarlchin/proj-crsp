// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

var User = require('../_models/UserSchema.js');
var bcrypt = require('bcryptjs');
var config = require('../config');

var LocalStrategy = require('passport-local').Strategy;

const admin = {
  username: config.adminusername,
  password: config.adminpwd
}

var localStrategy = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
},
function(username, password, done) {
  User.findOne({ username: username }).then(function(user){
     if ( user == null ) {
      return done( null, false, { message: 'Invalid user' } );
    };
    bcrypt.compare(password, user.password, function(err, res) {
      if (err) return done(err);
      if (res === false) {
        return done(null, false, {message: 'invalid password' });
      } else {
        return done(null, user);
      }
    });
  }).catch(done);
}
);

var adminStrategy = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
},
function(username, password, done) {
  if ( admin.username !== username  ) {
    return done( null, false, { message: 'Invalid admin account' } );
  };

  if ( admin.password !== password ) {
    return done( null, false, { message: 'Invalid admin password' } );
  };

  done( null, admin );
}
);

module.exports = {
  localStrategy: localStrategy,
  adminStrategy: adminStrategy
}




