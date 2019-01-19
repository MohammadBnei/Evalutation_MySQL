module.exports = (io) => {
    
    // on connection event
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.emit('server connection', 'Vous etes biens connecté !');
    });

    // sending to the client
    io.emit('hello', 'can you hear me?', 1, 2, 'abc');

    io.on('hello back', () => console.log('Everything OK (SocketIo)'))
};
