const express = require('express');
const bodyParser = require('body-parser');
// const db = require('../database');

const { dummyChannels, dummyUsers, dummyMessages } = require('./dummyData');

const app = express();
const server = app.listen(8000, () => {
  console.log('listening on port 9000!');
});

const io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/../client/dist'));

app.get('/', (req, res) => {
  res.send('server is responding to different paths');
});

app.get('/api/messages/:lat/:long', (req, res) => {
  // figure out which region we're looking in
  //retrieve all messages that have been tagged with that region
  //retrieve all messages tagged with general
  res.json(dummyMessages);
});

app.get('/api/:lat/:long/:channel', (req, res) => {
  //every message will have coords and so we'll check each time
  //actually this should be don
});



app.get('/api/:region/:channel', (req, res) => {
  //retrieve all messages that have been tagged with that region and channel
});

app.get('/api/region/:lat/:long', (req, res) => {
  //retrieve region name based off lat and long
});

app.get('/hi', (req, res) => {
  res.send('hi');
});

// likely no posting messages route -- everything will happen in the socket

io.sockets.on('connection', (socket) => {
  console.log('a user has connected');
  socket.on('subscribe', (room) => {
    console.log('joining room', room);
  });
  socket.on('unsubscribe', (room) => {
    console.log('leaving room', room);
  });
  socket.on('send', (data) => {
    // console.log('sending message', data.message);
    // io.sockets.in(data.roomAndRegion).emit('message', data);
    console.log('received message', data);
    io.emit('message', data);
  });
});
