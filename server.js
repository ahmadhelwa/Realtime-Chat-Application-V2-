'use strict';
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formateMessage = require('./utils/messages');
const {
  join,
  getUser,
  userLeave,
  getRoom,
  getall
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {

  socket.on('joinRoom', ({
    username,
    room
  }) => {

    const user = join(socket.id, username, room);
    socket.join(user.room)

    console.log('allllllllllllllllll', getall());
    socket.emit('message', formateMessage('LTUC BOT', 'welcome to LTUC chat'));

    socket.broadcast.to(user.room).emit('message', formateMessage('LTUC BOT', `${user.username} has joined chat`));
  
    io.to(user.room).emit('user-rooms-info', ({
      room: user.room,
      users: getRoom(user.room)
    }))
  });

  socket.on('disconnect', () => {

    const user = userLeave(socket.id);
   
    if (user) {
   
      io.to(user[0].room).emit('message', formateMessage('LTUC BOT', `${user[0].username} has left the chat`));
      
      io.to(user.room).emit('user-rooms-info', ({
        room: user[0].room,
        users: getRoom()
      }))
    }
  });

  socket.on('chatMessage', message => {

    console.log(socket.id);
    const user = getUser(socket.id);
  
    let x = user[0].username;
    
    io.to(user[0].room).emit('message', formateMessage(user[0].username, message));
  });
})

server.listen(PORT, () => {
  console.log(`server lestining on port ${PORT}`);
});