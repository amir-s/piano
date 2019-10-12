const fs = require('fs');
const midi = require('midi');

const WebSocket = require('ws');
const https = require('https');

const server = https.createServer(
  {
    cert: fs.readFileSync('./cert.pem'),
    key: fs.readFileSync('./key.pem'),
  },
  function(req, res) {
    res.writeHead(200);
    res.end('hello world\n');
  },
);

const wss = new WebSocket.Server({server});

let socket = null;
wss.on('connection', function connection(ws) {
  console.log('replacing socket');
  socket = ws;
});

const input = new midi.input();
let inputs = 0;

setInterval(() => {
  console.log('input.getPortCount()', input.getPortCount());
  for (let i = inputs; i < input.getPortCount(); i++) {
    input.openPort(i);
    inputs++;
  }
}, 2000);

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
  console.log('sending', keys);
  socket.send(JSON.stringify({name: 'state-keys', data: keys}));
});

server.listen(8080, () => {
  console.log('started');
});
