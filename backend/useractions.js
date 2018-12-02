var jwtuser = require('./_helpers/jwt').jwtuser;
var db = require('./_helpers/db');
var dbcall = require('./_helpers/dbcall');
var User = require('./_models/UserSchema');
var Comment = require('./_models/CommentSchema.js');
var errorHandler = require('./_helpers/error-handle');

module.exports = function (app){
  app.get("/useraction/events",jwtuser,function(req,res){
    dbcall.getAllEvents().then(function(events){
      res.json(events);
    },errorHandler(err));
  });

  app.put("/useraction/:username/likeevent", jwtuser,function(req,res){
    User.findOne( {username: req.params['username']}, function (err, user){
      if (err) errorHandler(err);
      if (user){
        if (user.favevents.includes(req.body.program_id)) {
          var fav = user.favevents.push(req.body.program_id);
          User.findOneAndUpdate({username: user.username}, {favevents: fav})
          .exec(function(err, result){
            if (err) errorHandler(err);
            if (reuslt) {
              res.status(204);
            }
          });
        }
      } else {
        res.status(200).json({message: "no user found!"});
      }
    });
  });

  app.put("/useraction/:username/unlikeevent", jwtuser,function(req,res){
    User.findOne( {username: req.params['username'] }, function (err, user){
      if (err) errorHandler(err);
      if (user){
        var fav = user.favevents.filter(function(value){
          return value === req.body.program_id;
        });
        User.findOneAndUpdate({username: user.username}, {favevents: fav})
        .exec(function(err, result){
          if (err) errorHandler(err);
          if (reuslt) {
            res.status(204);
          }
        });
      } else {
        res.status(200).json({message: "no user found!"});
      }
    });
  });

  app.put("/useraction/:username/:progId/leavecomment", jwtuser, function(req,res){
    Comment.findOne( {program_id: req.params['progId'] }, function(err, progcomments){
      if (err) errorHandler(err);
      if (progcomments){
        var com = progcomments.eventcomments.push({username: req.params['username'], usercomment: req.body.user_comment});
        Comment.findByIdAndUpdate({program_id: progcomments.program_id }, { eventcomments: com })
        .exec(function(err, event){
          if (err) errorHandler(err);
          res.json(event);
        });
      } else {
        var newevent = new Comment({
          program_id: req.params['progId'],
          eventcomments: [{ username: req.params['username'] , usercomment: req.body.user_comment }]
        });
        newevent.save(function(err, result){
          if (err) errorHandler(err);
          res.json(result);
        });
      }
    });
  });
}
