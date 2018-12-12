var jwtadmin = require('./_helpers/jwt').jwtadmin;
var fs = require('fs');
var multer = require('multer');
var csv = require('fast-csv');
var upload = multer({ dest: 'tmp/csv/' });
var Event = require('./_models/EventSchema');

module.exports = function(app) {
  app.post('/upload-csv', jwtadmin, upload.single('file'), function (req,res,next){
    console.log(req);
    csv.fromPath(req.file.path, {
      headers:  ["program_id", "program_name", "district", "venue", "start_date"
      , "end_date", "dayinweek", "start_time", "end_time", "type_name"
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
      console.log("uploading");
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
      console.log("something upload!");
      fs.unlinkSync(req.file.path);
      res.json({message: "success"});
    });

  });
}
