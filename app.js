const path = require('path');
const express = require('express');
const expressValidator = require('express-validator');
const app = express();
// Setting the environnement port to 3000
const port = process.env.port || 3000;

// Starting the server on the previously set port
const server = app.listen(port, () => console.log(`listening on port ${port}!`));

// Pool connecting to the database, used for querying in the form of a promise
const pool = require('./config/database');

// Custom fuctions for creating SQL query
const sqlLib = require('./util/sqlLib');

// SHA1 encryption method : SHA1(str)
const sha1 = require('crypto-js/sha1');

// Making the bidirectional socket listen to the server
var io = require('socket.io').listen(server);

// Making the default folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

/*
 *  using the JSON body parser
 */
const bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());

// importing necessary modules for Passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const sessionStore = new MySQLStore(require('./config/config'))


// Express session middleware
app.use(session({
  key: 'express.sid',
  name: 'MSESSION',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  /* cookie: {
    secure: process.env.ENVIRONMENT !== 'development' && process.env.ENVIRONMENT !== 'test',
    maxAge: 2419200000
  }, */
  secret: 'secret',
}));

// Initialize Passport session
app.use(passport.initialize());
app.use(passport.session());

// make this server CORS-ENABLE
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Creating the logic for the sign in of users
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback : true
}, async (req, email, password, done) => {
  if (!email || !password) {
    return done(null, false);
  }
  try {
    var users = await pool.query(sqlLib.buildFindByElemQuery({
      email: email,
    }, 'user'));
  } catch (error) {
    console.log(error);
    return done(error);
  }
  if (!users.length) return done(null, false);

  let user = users[0];

  if (user.password != sha1(password)) return done(null, false)

  return done(null, user)

}));

passport.serializeUser((user, done) => done(null, user.user_id));

passport.deserializeUser(async (user_id, done) => {
  console.log({user_id}, 'Deserialize')
  try {
    var result = await pool.query(sqlLib.buildFindByIdQuery({user_id}));
    return done(null, result[0]);
  } catch (error) {
    console.log(error);
  }
});

require('./util/sockets')(io);

// Handling Promise errors
process.on('unhandledRejection', error => console.error('Uncaught Error', error));

/*
 *  Setting the route 
 */
const routes = require('./routes/');
const router = express.Router();
routes(router);
app.use(router);
