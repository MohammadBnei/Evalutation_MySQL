const pug = require('pug');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const router = require('./util/router');
const port = process.env.port || 3000;

/*
 *  Setting pug as the view engine
 */
app.set('view engine', 'pug');

/*
 *  Setting the route 
 */
app.use(router);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('message', 'Vous etes biens connecté !');
});

app.listen(port, function(){
  console.log(`Server running on port ${port}`);
});
