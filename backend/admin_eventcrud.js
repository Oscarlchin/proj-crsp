var jwtadmin = require('./_helpers/jwt').jwtadmin;
var dbcall = require('./_helpers/dbcall');
var User = require('./_models/UserSchema');
var Comment = require('./_models/CommentSchema.js');
var Event = require('./_models/EventSchema');
var errorHandler = require('./_helpers/error-handle');
var bcrypt =require('bcryptjs');

module.exports = function (app){
    app.get('/events',jwtadmin,function(req,res){ //getallevents
      Event.find({}).exec(function(err,events){
        if(err) errorHandler(err);
        res.json(events);
      });
    });

    app.get('/events/:program_id',jwtadmin,function(req,res){ //get event by program_id
      Event.findOne({program_id: Number(req.params['program_id'])}).exec(function(err,event){
        if(err) errorHandler(err);
        if(event) res.json(event);
        else res.json(null);
      });
    });

    app.post('/events/create',jwtadmin,function(req,res){
        var event = new Event({
            program_id: Number(req.body.program_id),
            program_name: String(req.body.program_name),
            district: String(req.body.district),
            venue: String(req.body.venue),
            start_date: String(req.body.start_date),
            end_date: String(req.body.end_date),
            dayinweek: String(req.body.dayinweek),
            start_time: String(req.body.start_time),
            end_time: String(req.body.end_time),
            type_name: String(req.body.type_name),
            fee: Number(req.body.fee),
            quota: Number(req.body.quota),
            quota_left: Number(req.body.quota_left),
            min_age: Number(req.body.min_age),
            max_age: Number(req.body.max_age),
            url: String(req.body.url),
        });
        Event.findOne({program_id : event.program_id}, function (err, doc) {
          if (doc){
              res.send('Event exists already, create another one!');
          }
          else{
              console.log(event);
              event.save(function(err1){
                 if (err1) errorHandler(err1);
                 res.status(201).json(null);
               });
              }
          });
  });


    app.put('/events/:program_id',jwtadmin,function(req,res,next){

            var updateevent = new Event({
                program_id: Number(req.body.program_id),
                program_name: String(req.body.program_name),
                district: String(req.body.district),
                venue: String(req.body.venue),
                start_date: String(req.body.start_date),
                end_date: String(req.body.end_date),
                dayinweek: String(req.body.dayinweek),
                start_time: String(req.body.start_time),
                end_time: String(req.body.end_time),
                type_name: String(req.body.type_name),
                fee: Number(req.body.fee),
                quota: Number(req.body.quota),
                quota_left: Number(req.body.quota_left),
                min_age: Number(req.body.min_age),
                max_age: Number(req.body.max_age),
                url: String(req.body.url)
            });

            Event.findOne({program_id : updateevent.program_id}, function (err, doc) {
              if (doc){
                  res.send('An event with this program_id exists already, update failed!');
              }
              else{
                Event.findOneAndUpdate({program_id: Number(req.params['program_id'])},
                {program_id: Number(updateevent.program_id),
                    program_name: String(updateevent.program_name),
                    district: String(updateevent.district),
                    venue: String(updateevent.venue),
                    start_date: String(updateevent.start_date),
                    end_date: String(updateevent.end_date),
                    dayinweek: String(updateevent.dayinweek),
                    start_time: String(updateevent.start_time),
                    end_time: String(updateevent.end_time),
                    type_name: String(updateevent.type_name),
                    fee: Number(updateevent.fee),
                    quota: Number(updateevent.quota),
                    quota_left: Number(updateevent.quota_left),
                    min_age: Number(updateevent.min_age),
                    max_age: Number(updateevent.max_age),
                    url: String(updateevent.url)
                })

                .exec(function(err,event){
                console.log(event);
                if (err) errorHandler(err);
                if (event) res.status(202).json({Event: event.program_id});
                else res.status(202).json(null);
                });
              }
            });
    });


    app.delete('/events/:program_id',jwtadmin,function(req,res,next){

          Event.findOneAndDelete({program_id: Number(req.params['program_id'])})
          .exec(function(err,event){
            if (err) errorHandler(err);
            if (event) res.status(200).json({event:  event.program_id});
            else res.status(500).json(null);
          });


    });

  };
