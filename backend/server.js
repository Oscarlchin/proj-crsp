// Name: Chan Wang Wai ;    SID: 1155063885
var express = require('express');
var Passport = require( 'passport' );
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var bodyParser = require('body-parser');
var cors = require('cors');
var errorHandler = require('./_helpers/error-handle');
var jwt = require('jsonwebtoken');
var config = require('./config');
var passStrat = require('./_helpers/passport-strats');
var bcrypt = require('bcryptjs');

Passport.use( 'local', passStrat.localStrategy );
Passport.use( 'admin', passStrat.adminStrategy );

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use( bodyParser.json() );
app.use( Passport.initialize() );
app.use(cors({
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(errorHandler);

require('./extract.js')(app);
require('./useractions.js')(app);
require('./admin_eventcrud.js')(app);
require('./admin_usercrud.js')(app);

var dboptions = {
user: config.dbuser,
pass: config.dbpass,
dbName: config.dbName
};

mongoose.connect(config.dbURL, dboptions);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', function () { console.log("Connection is open...");
});

var User = require('./_models/UserSchema.js');


app.post('/users/authenticate', (req,res,next) => {
   return Passport.authenticate('local',{session:false}, (err, passportUser, info) =>{
     if (err) { return next(err);};

     if (passportUser){
        const token = jwt.sign({ username: passportUser.username }, config.secret, { audience: 'user'});
        const { password, ...userWithoutPassword } = passportUser._doc;
        //console.log(passportUser);
        return res.json({...userWithoutPassword, token});
     }
     return status(400).info;
   } )(req,res,next);
});

app.post('/admin/authenticate', (req,res,next) => {
  return Passport.authenticate('admin',{session:false}, (err, passportUser, info) =>{
    if (err) { return next(err);};

    if (passportUser){
       const token = jwt.sign({ username: passportUser.username }, config.secret, { audience: 'admin'});
       const { password, ...userWithoutPassword } = passportUser;
       return res.json({...userWithoutPassword, token});
    }
    return status(400).info;
  } )(req,res,next);
});



app.post('/users/register',(req,res,next) => {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      if (err) return next(err);
      var user = new User({
        username: req.body.username,
        password: hash,
        favevents: []
      });
      user.save(function(err){
        if (err) errorHandler(err);
        res.status(201).json(null);
      });
    });
  });
});

var server = app.listen(3000);
