import React from 'react';
import io from 'socket.io-client';

const socket = io();
export const remoteContext = React.createContext(socket);

export const RemoteWrapper = ({children}) => {
  return (
    <remoteContext.Provider value={socket}>{children}</remoteContext.Provider>
  );
};
