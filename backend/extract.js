var https = require('https');
var httpsoptions = {
  host: 'www.lcsd.gov.hk',
//  path: '/datagovhk/event/leisure_prog.json'
//  path: '/datagovhk/event/leisure_prog.schema.json'
};

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
              var body = Buffer.concat(bodyChunks);

            //  res.send(body);

            // ...and/or processls the entire body here.
            //  var data = JSON.parse(body);
              // data is available here:
            //  console.log(data);
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
