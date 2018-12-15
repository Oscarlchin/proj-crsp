// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

var mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
  program_id: { type: Number, required: true, unique: true },
  program_name: { type: String, required: true },
  district: { type: String, required: true },
  venue: { type: String, required: true},
  start_date: {type: String },
  end_date: {type: String },
  dayinweek: {type: String},
  start_time: {type: String},
  end_time: {type: String},
  type_name: {type: String},
  fee: {type: Number},
  quota: { type: Number },
  quota_left: { type: Number },
  min_age: { type: Number },
  max_age: { type: Number },
  url: { type: String }
  });

  module.exports = mongoose.model('Event',EventSchema);
