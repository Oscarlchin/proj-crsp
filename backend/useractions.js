var jwtuser = require('./_helpers/jwt').jwtuser;
var dbcall = require('./_helpers/dbcall');
var User = require('./_models/UserSchema');
var Comment = require('./_models/CommentSchema.js');
var errorHandler = require('./_helpers/error-handle');
var Event = require('./_models/EventSchema');
var fs = require('fs');
var multer = require('multer');
var csv = require('fast-csv');
var upload = multer({ dest: 'tmp/csv/' });


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
          User.findOneAndUpdate({username: user.username}, {favevents: user.favevents})
          .exec(function(err, result){
            if (err) errorHandler(err);
            if (result) {
              res.status(204).json(null);
            } else res.send("something went wrong!");
          });
        } else res.status(200).json({message: "already liked"});
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
        User.findOneAndUpdate({username: user.username}, {favevents: fav})
        .exec(function(err, result){
          if (err) errorHandler(err);
          if (result) {
            res.status(204).json(null);
          }
        });
      } else {
        res.status(200).json({message: "no user found!"});
      }
    });
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
    } else res.send("no this program");
  });

  app.post('/upload-csv', jwtuser, upload.single('file'), function (req,res,next){
    csv.fromPath(req.file.path, {
      headers:  ["program_id", "program_name", "district", "venue", "start_data"
      , "end_data", "dayinweek", "start_time", "end_time", "type_name"
      , "fee", "quota", "quota_left" , "min_age", "max_age", "url"]
    })
    .on('error', function(err) {
      res.json(err);
    })
    .validate(function(data){
      return true ;
    })
    .on("data-invalid", function(data){
      //res.status(200);
      //console.log('err');
    })
    .on("data", function (data) {
      var event = new Event({
        program_id: Number(data.program_id),
        program_name: String(data.program_name),
        district: String(data.district),
        venue: String(data.venue),
        start_date: String(data.start_date),
        end_date: String(data.end_date),
        dayinweek: String(data.dayinweek),
        start_time: String(data.start_time),
        end_time: String(data.end_time),
        type_name: String(data.type_name),
        fee: Number(data.fee),
        quota: Number(data.quota),
        quota_left: Number(data.quota_left),
        min_age: Number(data.min_age),
        max_age: Number(data.max_age),
        url: String(data.url),
      });
      Event.findOne({program_id : event.program_id}, function (err, doc) {
       if (doc){
           //res.send('Event exists already, create another one!');
       }
       else{
            //console.log(event);
            event.save();
           }
      });
    })
    .on("end", function () {

      fs.unlinkSync(req.file.path);
      res.json({message: "success"});
    })
;

  })


}
