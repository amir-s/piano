import React from 'react';

let socket;

const handlers = {};
const connect = () => {
  console.log('connecting');
  socket = new WebSocket('ws://localhost:8080');
  // socket = new WebSocket('wss://piano.lan:8080');
  socket.onmessage = event => {
    const payload = JSON.parse(event.data);
    if (!handlers[payload.name]) return;
    handlers[payload.name].forEach(fn => {
      fn(payload.data);
    });
  };

  socket.onclose = e => {
    console.log('connection closed');
    setTimeout(connect, 1000);
  };
  socket.onerror = e => {
    console.log('connection errored');
  };
};

connect();
const wrappedSocket = {
  socket,
  on: (name, handler) => {
    handlers[name] = handler[name] || [];
    handlers[name].push(handler);
  },
};
export const remoteContext = React.createContext(wrappedSocket);

export const RemoteWrapper = ({children}) => {
  return (
    <remoteContext.Provider value={wrappedSocket}>
      {children}
    </remoteContext.Provider>
  );
};
