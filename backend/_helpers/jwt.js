var expressJwt = require('express-jwt');
var config = require('../config.json');

module.exports = {
  jwtuser,
  jwtadmin
};

function jwtuser(){
  return expressJwt({secret: config.secret, audience: 'user'});
}
function jwtadmin(){
  return expressJwt({secret: config.secret, audience: 'admin'});
}


