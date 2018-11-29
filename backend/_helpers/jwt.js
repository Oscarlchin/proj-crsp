var expressJwt = require('express-jwt');
var config = require('../config.json');

module.exports = {
  jwtuser:() => {return jwtuser;},
  jwtadmin:() => {return jwtadmin;}
};

var jwtuser = expressJwt({secret: config.secret, audience: 'user'});

var jwtadmin = expressJwt({secret: config.secret, audience: 'admin'});
