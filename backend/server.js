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

Passport.use( 'local', passStrat.localStrategy() );
Passport.use( 'admin', passStrat.adminStrategy() );

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use( bodyParser.json() );
app.use( Passport.initialize() );
app.use(cors({
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(errorHandler);



/**
var options = {
user: 'cadmin',
pass: '8yKdsSjN23mhJTos',
dbName: 'proj-crsp'
};
var dbURL="mongodb+srv://cluster0-uowod.mongodb.net/proj-crsp";

mongoose.connect(dbURL, options);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', function () { console.log("Connection is open...");
});

var EventSchema = mongoose.Schema({
  eventId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  loc: { type: ObjectId, ref:"Location" },
  quota: { type: Number }
  });

var EventSchema = mongoose.Schema({
    eventId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    loc: { type: ObjectId, ref:"Location" },
    quota: { type: Number }
    });

var Event = mongoose.model('Event', EventSchema);
 */

app.post('/users/authenticate', (req,res,next) => {
   return Passport.authenticate('local',{session:false}, (err, passportUser, info) =>{
     if (err) { return next(err);};

     if (passportUser){
        const token = jwt.sign({ username: passportUser.username }, config.secret, { audience: 'user'});
        const { password, ...userWithoutPassword } = passportUser;
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

var server = app.listen(3000);
