// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

var jwtuser = require('./_helpers/jwt').jwtuser;
var dbcall = require('./_helpers/dbcall');
var User = require('./_models/UserSchema');
var Comment = require('./_models/CommentSchema.js');
var errorHandler = require('./_helpers/error-handle');
var Event = require('./_models/EventSchema');

module.exports = function (app){
  app.get("/useraction/events",jwtuser,function(req,res){
    dbcall.getAllEvents().then(function(events){
      res.json(events);
    },errorHandler);
  });

  app.put("/useraction/:username/likeevent", jwtuser,function(req,res){
    User.findOne( {username: req.params['username']}, function (err, user){
      if (err) errorHandler(err);
      if (user){
        if (!user.favevents.includes(Number(req.body.program_id))) {
          user.favevents.push(Number(req.body.program_id));
          //console.log(user.favevents);
          User.findOneAndUpdate({username: user.username}, {favevents: user.favevents},  {new: true})
          .exec(function(err, result){
            if (err) errorHandler(err);
            if (result) {
              res.json(result);
            } else res.send("something went wrong!");
          });
        } else res.status(200).json({error: "already liked"});
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
          return value !== Number(req.body.program_id);
        });
        User.findOneAndUpdate({username: user.username}, {favevents: fav},  {new: true})
        .exec(function(err, result){
          if (err) errorHandler(err);
          if (result) {
            res.json(result);
          }
        });
      } else {
        res.json({error: "no user found!"});
      }
    });
  });

  app.get("/useraction/comment/:progId",function (req,res){
    if (Number(req.params['progId'])){
    Comment.findOne( {program_id: Number(req.params['progId'])}, function(err, progcomments) {
      if (err) errorHandler(err);
      if (progcomments) res.json(progcomments);
      else res.json(null);
    });
    } else { res.json({ err: "invaliad program id" } ); }
  });

  app.put("/useraction/:username/:progId/leavecomment", jwtuser, function(req,res){
    if (Number(req.params['progId'])){
    Comment.findOne( {program_id: Number(req.params['progId']) }, function(err, progcomments){
      if (err) errorHandler(err);
      if (progcomments){
        progcomments.eventcomments.push({username: req.params['username'], usercomment: req.body.user_comment});
        Comment.findOneAndUpdate({program_id: progcomments.program_id }, { eventcomments: progcomments.eventcomments } , {new: true} )
        .exec(function(err, event){
          if (err) errorHandler(err);
          res.json(event);
        });
      } else {
        Event.findOne({program_id: Number(req.params['progId'])}, function(err, event){
          if (event){
            var newevent = new Comment({
              program_id: Number(req.params['progId']),
              eventcomments: [{ username: req.params['username'] , usercomment: req.body.user_comment }]
            });
            newevent.save(function(err, result){
              if (err) errorHandler(err);
              res.json(result);
            });
          } else {res.send("no this program"); }
        });
      }
    });
    } else res.json({err : "invalid program id"});
  });
}
