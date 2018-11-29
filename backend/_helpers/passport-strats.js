var LocalStrategy = require('passport-local').Strategy;

module.exports = {
  localStrategy: () => { return localStrategy;},
  adminStrategy: () => { return adminStrategy;}
}

var users = {
  userone: {
    username: 'userone',
    password: '1234'
  },
  usertwo: {
    username: 'usertwo',
    password: '5678'
  },
  admin:{
    username: 'admin',
    password: 'admin'
  }
}

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




