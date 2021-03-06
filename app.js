const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();

// Setting the environnement port to 3000
const port = process.env.port || 3000;

// Making the default folder 'public'
app.use('/static', express.static(path.join(__dirname, '/public')));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

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

app.use(fileUpload());

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(require('./config/config'));


// Express session middleware
app.use(session({
  key: 'express.sid',
  name: 'MSESSION',
  store: sessionStore,
  resave: true,
  saveUninitialized: false,
  secret: 'secret',
}));

require('./config/passport')(app);

// make this server CORS-ENABLE
app.use(cors());

//custom Middleware for logging the each request going to the API
/**
app.use((req,res,next) => {
    console.log(`Received a ${req.method} request from ${req.ip} for ${req.url}`);
    if (req) console.log({body: req.body}, {params: req.params}, {header: req.headers}, {cookie: req.cookies})

    next();
});
 */


// Handling Promise errors
process.on('unhandledRejection', error => console.error('Uncaught Error', error));


app.use((req,res, next) => {
  req.setTimeout(5000, () => {  
    console.log('The server takes too long to respond, aborting...');
    req.abort();
  });
  next();
})



/*
 *  Setting the route 
 */
const routes = require('./routes/');
const router = express.Router();
routes(router);
app.use(router);

// Starting the server on the previously set port
const server = app.listen(port, () => console.log(`listening on port ${port}!`));

// Making the bidirectional socket listen to the server
//const io = require('socket.io').listen(server);