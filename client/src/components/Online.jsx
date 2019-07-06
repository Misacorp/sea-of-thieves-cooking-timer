import React, { useState, useRef } from 'react';
import { Switch, Route } from 'react-router-dom';
import { uniqueNamesGenerator } from 'unique-names-generator';

import ConnectionContext from './contexts/ConnectionContext';
import RoomSelect from './RoomSelect';
import OnlineRoom from './OnlineRoom';
import { createSocket, startListening } from '../services/socketHandler';
import * as routes from '../types/routes';

/**
 * Auto-populate fields in development for faster testing
 */
let initialNickname = '';
if (process.env.NODE_ENV === 'development') {
  initialNickname = uniqueNamesGenerator('-', true);
}

/**
 * User has selected to go Online. This component handles things from there on:
 * - Username selection
 * - Create or join room
 */
const Online = () => {
  const [activeRoomCode, setActiveRoomCode] = useState(null);
  const [nickname, setNickname] = useState(initialNickname);

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
    console.log('Weird case of no socket whatsoever');
    return null;
  }

  const connection = {
    socket: socket.current,
    nickname,
    setNickname: newNickname => setNickname(newNickname),
    activeRoomCode,
    setActiveRoomCode: roomCode => setActiveRoomCode(roomCode),
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
