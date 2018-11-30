var mongoose = require('mongoose');
var Event = require('../_models/EventSchema.js');

exports.getAllEvents = getAllEvents;

function getAllEvents() {
    return new Promise(function(resolve, reject){
      Event.find({})
      .exec(function(err,events){
          if (err) reject({err: "Error in fetching events"});
          return resolve(events);
      });
    });
}
