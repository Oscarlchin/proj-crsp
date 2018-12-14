var https = require('https');
var errorHandler = require('./_helpers/error-handle');
var httpsoptions = {
  host: 'www.lcsd.gov.hk',
  path: '/datagovhk/event/leisure_prog.json'
//  path: '/datagovhk/event/leisure_prog.schema.json'
};

var Event = require('./_models/EventSchema');

module.exports = function (app){
  app.get('/extracttolocal',function(req,res){
    var httpsreq = https.get(httpsoptions, function(httpsres) {
      console.log('STATUS: ' + httpsres.statusCode);
      console.log('HEADERS: ' + JSON.stringify(httpsres.headers));

      // Buffer the body entirely for processing as a whole.
      var bodyChunks = [];
      httpsres.on('data', function(chunk) {
        //console.log(chunk);
        // You can process streamed parts here...
        bodyChunks.push(chunk);
      }).on('end', function() {
        if (res.statusCode === 200) {
          try {
              var str = Buffer.concat(bodyChunks);
              escapednonascii = str.toString().replace(/[^\0-~]/g, function(ch) {
                return "\\u" + ("0000" + ch.charCodeAt().toString(16)).slice(-4);
              });
              var data = JSON.parse(escapednonascii);
              var promises = data.map(function(prog){
                return new Promise(function(resolve,reject){
                  var tmp_sd = String(prog.PGM_START_DATE).split(" ")[0];
                  var tmp_ed = String(prog.PGM_END_DATE).split(" ")[0];
                  var tmp = {
                    program_id: Number(prog.PGM_CODE),
                    program_name: String(prog.EN_PGM_NAME),
                    district: String(prog.EN_DISTRICT),
                    venue: String(prog.EN_VENUE),
                    start_date: tmp_sd,
                    end_date: tmp_ed,
                    dayinweek: String(prog.EN_DAY),
                    start_time: String(prog.PGM_START_TIME),
                    end_time: String(prog.PGM_END_TIME),
                    type_name: String(prog.EN_ACT_TYPE_NAME),
                    fee: Number(prog.FEE),
                    quota: Number(prog.QUOTA),
                    quote_left: Number(prog.PLACES_LEFT),
                    min_age: Number(prog.MIN_AGE),
                    max_age: Number(prog.MAX_AGE),
                    url: String(prog.EN_URL)
                  };
                  Event.findOneAndUpdate({program_id: tmp.program_id}, tmp, {upsert:true}, function(err, result){
                    if (err) reject(err);
                    resolve();
                  });
                });
              });
            Promise.all(promises)
            .then(function(){
              console.log("updated");
              res.json({success: 'database updated!'});
            }).catch(console.error);
          } catch (e) {
              console.log(e);
          }
        } else {
          console.log('Status:', res.statusCode);
        }
      });
    });

    httpsreq.on('error', function(httpse) {
      console.log('ERROR: ' + httpse.message);
    });
  });


}
