var expressJwt = require('express-jwt');
var config = require('../config.json');

var jwtuser = expressJwt({secret: config.secret, audience: 'user'});

var jwtadmin = expressJwt({secret: config.secret, audience: 'admin'});

module.exports = {
  jwtuser: jwtuser,
  jwtadmin: jwtadmin
}
