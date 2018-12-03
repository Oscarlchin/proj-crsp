var jwtadmin = require('./_helpers/jwt').jwtadmin;
var dbcall = require('./_helpers/dbcall');
var User = require('./_models/UserSchema');
var Comment = require('./_models/CommentSchema.js');
var Event = require('./_models/EventSchema');
var errorHandler = require('./_helpers/error-handle');
var bcrypt =require('bcryptjs');

module.exports = function (app){
    app.get('/events',jwtadmin,function(req,res){ //getallevents
      User.find({}).exec(function(err,events){
        if(err) errorHandler(err);
        res.json(events);
      });
    });
  
    app.get('/events/:program_id',jwtadmin,function(req,res){ //get event by program_name
      User.findOne({event: req.params['program_id']}).exec(function(err,event){
        if(err) errorHandler(err);
        if(event) res.json(event);
        else res.json(null);
      });
    });
  
    app.post('/events/create',jwtadmin,function(req,res){
        var event = new Event({
            program_id: req.body.program_id,
            program_name: req.body.program_name,
            district: req.body.district,
            venue: req.body.venue,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            dayinweek: req.body.dayinweek,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            type_name: req.body.type_name,
            fee: req.body.fee,
            quota: req.body.quota,
            quota_left: req.body.quota_left,
            min_age: req.body.min_age,
            max_age: req.body.max_age,
            url: req.body.url,
        });
         event.save(function(err){
            if (err) errorHandler(err);
            res.status(201);
        });
    });
  
    app.put('/events/:program_id',jwtadmin,function(req,res,next){ //find event by program_name and update
          Event.findOneAndUpdate({event: req.params['program_id']})
          .exec(function(err,event){
            if (err) errorHandler(err);
            if (event) res.status(204).json({event:program_id});
            else res.status(204).json(null);
          });
        
      
    });
  
    app.delete('/events/:program_id',jwtadmin,function(req,res,next){
      
          Event.findOneAndRemove({program_name: req.params['program_id']})
          .exec(function(err,event){
            if (err) errorHandler(err);
            if (event) res.status(200).json({event:program_id});
            else res.status(500).json(null);
          });
        
      
    });
  
  };