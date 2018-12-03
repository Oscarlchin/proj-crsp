var mongoose = require('mongoose');
var Event = require('../_models/EventSchema.js');
var User = require('../_models/UserSchema.js');
exports.getAllEvents = getAllEvents;

function getAllEvents() {
    return new Promise(function(resolve, reject){
      Event.find({quota: 25})
      .exec(function(err,events){
          if (err) reject({err: "Error in fetching events"});
          return resolve(events);
      });
    });
}



