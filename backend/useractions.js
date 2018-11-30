var jwtuser = require('./_helpers/jwt').jwtuser;
var db = require('./_helpers/db');
module.exports = function (app){
  app.get("/useraction/events",jwtuser,function(req,res){
    res.send(db.events);
  });

}
