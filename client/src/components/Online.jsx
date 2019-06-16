import React, { useRef } from 'react';
import { Switch, Route } from 'react-router-dom';

import ConnectionContext from './contexts/ConnectionContext';
import RoomSelect from './RoomSelect';
import OnlineRoom from './OnlineRoom';
import { createSocket, startListening } from '../services/socketHandler';
import * as routes from '../types/routes';

const Online = props => {
  console.log('Online', props);

  // Create an empty socket and a mock socket.
  const socket = useRef();

  // If no socket has been set, create a new one.
  // We add this directly to the socket ref to prevent unnecessary changes to it in the future.
  if (socket.current === undefined) {
    console.log('No socket set. Creating!');
    socket.current = createSocket();

    // Initialize event listeners on the socket.
    startListening(socket.current);
  }
  if (!socket.current) {
    return null;
  }

  const connection = {
    socket: socket.current,
    roomCode: null,
    setRoomCode: roomCode =>
      console.log('Mock function to set room code to', roomCode),
  };

  return (
    <ConnectionContext.Provider value={connection}>
      <Switch>
        <Route
          path={`${routes.ONLINE_ROOT}/:roomCode`}
          component={OnlineRoom}
        />
        <Route path="/" component={RoomSelect} />
      </Switch>
    </ConnectionContext.Provider>
  );
};

export default Online;
