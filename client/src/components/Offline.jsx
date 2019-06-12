import React, { useRef } from 'react';

import fakeSocket from '../services/fakeSocket';
import ConnectionContext from './contexts/ConnectionContext';

import TimerGrid from './Timers/TimerGrid';

const Offline = () => {
  // Create an empty socket and a mock socket.
  const socket = useRef();

  fakeSocket.init();
  socket.current = fakeSocket;

  return (
    <ConnectionContext.Provider value={{ socket: socket.current }}>
      <TimerGrid />
    </ConnectionContext.Provider>
  );
};

export default Offline;
