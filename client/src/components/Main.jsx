import React, { useRef, useReducer } from 'react';

import ConnectionContext from './contexts/ConnectionContext';
import { createSocket, startListening } from '../services/socketHandler';

import Header from './Header';
import Welcome from './Welcome';
import AppControls from './AppControls';
import MessageDisplay from './MessageDisplay/MessageDisplay';
import TimerGrid from './Timers/TimerGrid';

const initialState = {
  state: 'SETUP',
  socket: null,
};

/**
 * Actual main app content.
 */
const Main = () => {
  // Create an empty socket and a mock socket.
  const socket = useRef();
  const fakeSocket = {
    on: data => console.log('fakeSocket on:', data),
    emit: data => console.log('fakeSocket emit:', data),
  };

  // Changes connection type and sets the communication object accordingly (socket vs. mock socket).
  const connectionReducer = (state, action) => {
    switch (action.type) {
      // The user is selecting whether they want to be online or offline.
      case 'SETUP':
        return { state: 'SETUP', socket: null };

      // The user wants to be offline.
      case 'OFFLINE':
        return { state: 'OFFLINE', socket: fakeSocket };

      // The user wants to go online and is selecting a room to join (or create).
      case 'ONLINE_SETUP':
        // If no socket has been set, create a new one.
        // We add this directly to the socket ref to prevent unnecessary changes to it in the future.
        if (socket.current === undefined) {
          socket.current = createSocket();

          // Initialize event listeners on the socket.
          startListening(socket.current);
        }
        return { state: 'ONLINE_SETUP', socket: socket.current };

      // The user is finally online and in a room.
      case 'ONLINE':
        return { ...state, state: 'ONLINE' };

      default:
        throw new Error(
          `Action of type ${
            action ? action.type : '(action is undefined)'
          } is not supported }`,
        );
    }
  };

  const [connection, dispatch] = useReducer(connectionReducer, initialState);
  const connectionValue = { connection, dispatch }; // Provide this to context consumers.
  const { state } = connection;

  return (
    <ConnectionContext.Provider value={connectionValue}>
      <React.Fragment>
        <Header />
        {(state === 'SETUP' || state === 'ONLINE_SETUP') && <Welcome />}
        {(state === 'OFFLINE' || state === 'ONLINE') && <TimerGrid />}
        <MessageDisplay />
        <AppControls />
      </React.Fragment>
    </ConnectionContext.Provider>
  );
};

export default Main;
