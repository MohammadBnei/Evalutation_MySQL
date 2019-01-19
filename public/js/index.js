// eslint-disable-next-line no-undef
var socket = io.connect('http://localhost:3000');

console.log('Client socket');

socket.on("hello", (socket) => {
  console.log('Connected to the server with socket Io');
  socket.emit('hello back', 'hi');
});

socket.on("server connection", () => console.log('Server side connection ok'));