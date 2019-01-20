const path = require('path');
const express = require('express');
const app = express();

// Setting the environnement port to 3000
const port = process.env.port || 3000;

// Starting the server on the previously set port
const server = app.listen(port, () => console.log(`listening on port ${port}!`));

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

require('./config/passport')(app);

// make this server CORS-ENABLE
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
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
