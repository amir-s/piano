import {useState, useContext} from 'react';
import {remoteContext} from './RemoteWrapper';

export function useRemoteState<T>(id: string, initialValue: T): T {
  const [state, setState] = useState<T>(initialValue);
  const socket = useContext(remoteContext);
  socket.on(`state-${id}`, data => {
    setState(data);
  });
  return state;
}
