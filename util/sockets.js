module.exports = (io) => {
    var eventSocket = io.of('/events');

    // on connection event
    eventSocket.on('connection', function(socket){
        console.log('a user connected');
        console.log({socketRequest: socket.request})
        socket.emit('message', 'Vous etes biens connecté !');
    });
};
