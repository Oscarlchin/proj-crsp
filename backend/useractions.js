var jwtuser = require('./_helpers/jwt').jwtuser;
var db = require('./_helpers/db');
var dbcall = require('./_helpers/dbcall');
module.exports = function (app){
  app.get("/useraction/events",jwtuser,function(req,res){
    dbcall.getAllEvents().then(function(events){
      res.json(events);
    },function(err){
      res.json(err);
    });
  });
}
