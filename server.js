const midi = require('midi');

let socket = null;

const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8080});

wss.on('connection', function connection(ws) {
  console.log('replacing socket');
  socket = ws;
});

const input = new midi.input();
for (let i = 0; i < input.getPortCount(); i++) {
  input.openPort(i);
}

const keys = {};

input.on('message', function(deltaTime, message) {
  if (message[0] !== 144 && message[0] !== 128) return;
  var key = message[1] - 21 - 3;
  keys[key] = true;
  if (message[0] === 128) delete keys[key];
  console.log(keys);
  if (!socket) {
    return console.log('socket not set');
  }
  socket.send(JSON.stringify({name: 'state-keys', data: keys}));
});
