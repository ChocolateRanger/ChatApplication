// https://chatappbackend-5mof.onrender.com/

const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const port = process.env.PORT || 5000;
const cors = require('cors');
const { addUser, removeUser, getUser } = require('./users.js')

const app = express();
const server = http.createServer(app);

const io = require('socket.io') (server, {
    cors: {
        origin: "https://63d3b5c61684300008f036ef--timely-lolly-560457.netlify.app",
        methods: ["GET", "POST"]
    }
});

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
        let dates = new Date();
        let time = dates.getHours() + ':' + dates.getMinutes();
        let date = time.split(':').map(e => e.padStart(2, 0)).join(':')
        // let time = date.split(':').map(e => e.padStart(2, 0)).join(':')
        console.log(date);
        io.to(user.room).emit('message', { user: user.name, text: message, date: date })

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        console.log(user);
        console.log('User has Left');

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` })
        }


    })
})
