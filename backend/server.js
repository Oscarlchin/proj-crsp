var express = require('express');
var app = express();

// handle ALL requests
app.all('/*', function (req, res) {
// send this to client
res.send("Hello World!");
});

// listen to port 3000
var server = app.listen(3000);
