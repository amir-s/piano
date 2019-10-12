import React from 'react';

const socket = new WebSocket('ws://pi.local:8080');

const handlers = {};
socket.onmessage = event => {
  const payload = JSON.parse(event.data);
  if (!handlers[payload.name]) return;
  handlers[payload.name].forEach(fn => {
    fn(payload.data);
  });
};

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
