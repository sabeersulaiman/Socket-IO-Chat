var express = require('express');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('bin'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log("Disconnected.");
    });
    socket.on('chat message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('chat message', msg);
    });
    socket.emit('online', "You are online");
})