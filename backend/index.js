const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const port = process.env.PORT || 5000;
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors({
    origin: 'https://63ca8df3bada43220d2bda26--tourmaline-kashata-391eb1.netlify.app'
}))


app.use(router);

server.listen(port, () => console.log(`Server has started on Port ${port}`));

io.on('connection', (socket) => {
    console.log("User Connected");

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);
        const { error, user } = addUser({ id: socket.id, name, room });
        console.log(user);
        if (error) return callback(error);
        socket.join(user.room);
        console.log(socket.id);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        callback();

    })

    socket.on('sendMessage', (message, callback) => {
        console.log(message);
        console.log(socket.id);
        const user = getUser(socket.id);
        console.log(user);
        io.to(user.room).emit('message', { user: user.name, text: message })

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        console.log('User has left');

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
 
    })
})
