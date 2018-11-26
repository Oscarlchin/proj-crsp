// Name: Chan Wang Wai ;    SID: 1155063885
var express = require('express');
var Passport = require( 'passport' );
var LocalStrategy = require( 'passport-local' ).Strategy;
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var bodyParser = require('body-parser');
var cors = require('cors');

var users = {
  userone: {
    username: 'userone',
    password: '1234',
    token: 'jwt1',
  },
  usertwo: {
    username: 'usertwo',
    password: '5678',
    token: 'jwt2',
  },
}

var localStrategy = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  function(username, password, done) {
    user = users[ username ];

    if ( user == null ) {
      return done( null, false, { message: 'Invalid user' } );
    };

    if ( user.password !== password ) {
      return done( null, false, { message: 'Invalid password' } );
    };

    done( null, user );
}
)

Passport.use( 'local', localStrategy );

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use( bodyParser.json() );
app.use( Passport.initialize() );
app.use(cors({
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));


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
        const user = passportUser;
        return res.json(user);
     }
     return status(400).info;
   } )(req,res,next);
}

);

var server = app.listen(3000);
