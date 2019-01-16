const pug = require('pug');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const pool = require('./config/database');
const sqlLib = require('./util/sqlLib');
const crypt = require('./util/crypt');
var socketio = require('socket.io');
var passportSocketIo = require('passport.socketio');
var cookieParser = require('cookie-parser');
const io = socketio(http);

const port = process.env.port || 3000;

// import necessary modules for Passport
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

// Express session middleware
app.use(session({
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.ENVIRONMENT !== 'development' && process.env.ENVIRONMENT !== 'test',
    maxAge: 2419200000
  },
  secret: 'secret',
}));

passport.serializeUser((user, done) => done(null, user.user_id));

passport.deserializeUser(async (user_id, done) => {
  try {
    var user = await pool.query(sqlLib.buildFindByIdQuery({user_id: user_id}));
  } catch (error) {
    console.log(error);
  }
    done(null, user);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordFiel: 'password',
},async (email, password, done) => {
  try {
    var users = await pool.query(sqlLib.buildFindByElemQuery({
      email: email,
      password: crypt.SHA1(password),
    }, 'user'));
  } catch (error) {
    console.log(error);
  }

  if (users.length === 1) done(null, users[0]);
  else done('Wrong password or email', false);
}));


// Initialize Passport session
app.use(passport.initialize());
app.use(passport.session());

io.use(passportSocketIo.authorize({
  key: 'connect.sid',
  secret: 'secret',
  passport: passport,
  cookieParser: cookieParser
}))

/*
 *  Setting pug as the view engine
 */
app.set('view engine', 'pug');

/*
 *  using the JSON body parser
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json());

/*
 *  Setting the route 
 */
const routes = require('./routes/');
const router = express.Router();
routes(router);
app.use(router);

require('./util/sockets')(io);

app.listen(port, function(){
  console.log(`Server running on port ${port}`);
});
