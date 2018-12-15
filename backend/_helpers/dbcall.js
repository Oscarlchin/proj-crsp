// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

var mongoose = require('mongoose');
var Event = require('../_models/EventSchema.js');
var User = require('../_models/UserSchema.js');
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



