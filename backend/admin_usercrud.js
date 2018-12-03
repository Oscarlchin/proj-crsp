var jwtadmin = require('./_helpers/jwt').jwtadmin;
var dbcall = require('./_helpers/dbcall');
var User = require('./_models/UserSchema');
var Comment = require('./_models/CommentSchema.js');
var Event = require('./_models/EventSchema');
var errorHandler = require('./_helpers/error-handle');
var bcrypt =require('bcryptjs');

module.exports = function (app){
  app.get('/users',jwtadmin,function(req,res){ //getalluser
    User.find({}).exec(function(err,users){
      if(err) errorHandler(err);
      res.json(users);
    });
  });

  app.get('/users/:username',jwtadmin,function(req,res){ //get user by username
    User.findOne({username: req.params['username']}).exec(function(err,user){
      if(err) errorHandler(err);
      if(user) res.json(user);
      else res.json(null);
    });
  });

  app.post('/users/create',jwtadmin,(req,res,next) => {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) return next(err);
        var user = new User({
          username: req.body.username,
          password: hash,
          favevents: []
        });
          User.findOne({username : user.username}, function (err, doc) {
              if (doc){
                  res.send('Username exists already, create another one!');
              }
              else{
                user.save(function(err){
                  if (err) errorHandler(err);
                  res.status(201).json(null);
                });
              }
          });
      });
    });
  });



  app.put('/users/:username',jwtadmin,function(req,res,next){
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) return next(err);
        User.findOneAndUpdate({username: req.params['username']}, {username: req.body.username, password:hash})
        .exec(function(err,user){
          console.log(user);
          if (err) errorHandler(err);
          if (user) res.status(204).json({username: user.username});
          else res.status(204).json(null);
        });
      });
    });
  });

  app.delete('/users/:username',jwtadmin,function(req,res,next){
    User.findOneAndRemove({username: req.params['username']} )
    .exec(function(err,user){
      if (err) errorHandler(err);
      if (user) res.status(200).json({username: user.username});
      else res.status(500).json(null);
    });
    /**
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) return next(err);
        User.findOneAndRemove({username: req.params['username']}, {username: req.body.username, password:hash})
        .exec(function(err,user){
          if (err) errorHandler(err);
          if (user) res.status(500);
          else res.status(500).json(null);
        });
      });
    });
     */
  });

};

