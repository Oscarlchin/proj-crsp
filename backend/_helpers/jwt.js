// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

var expressJwt = require('express-jwt');
var config = require('../config.json');

var jwtuser = expressJwt({secret: config.secret, audience: 'user'});

var jwtadmin = expressJwt({secret: config.secret, audience: 'admin'});

module.exports = {
  jwtuser: jwtuser,
  jwtadmin: jwtadmin
}
