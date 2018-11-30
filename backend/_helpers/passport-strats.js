var db = require('./db.js');

var LocalStrategy = require('passport-local').Strategy;

var users = db.users;

var localStrategy = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
},
function(username, password, done) {
  user = users[ username ]; //find users in local

  if ( user == null ) {
    return done( null, false, { message: 'Invalid user' } );
  };

  if ( user.password !== password ) {
    return done( null, false, { message: 'Invalid password' } );
  };

  done( null, user );
}
);


var adminStrategy = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
},
function(username, password, done) {
  admin = users['admin']; //find admin in local
  if ( (admin == null) || (admin.username !== username)  ) {
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




