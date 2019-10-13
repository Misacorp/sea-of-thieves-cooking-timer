import React, { useState, createContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { createSocket, startListening } from '../../services/socketHandler';
import connectionPoller from '../../services/connectionPoller';
// import { get as getFromLocalStorage } from '../../services/localStorageHandler';

const ConnectionContext = createContext();

// const initialNickname = getFromLocalStorage('nickname') || '';
const initialNickname = '';

/**
 * Contains values and functions required in connecting to a server.
 */
const ConnectionContextContainer = ({ children }) => {
  const [activeRoomCode, setActiveRoomCode] = useState();
  const [nickname, setNickname] = useState(initialNickname);

  // If no socket has been set, create a new one.
  // We add this directly to the socket ref to prevent unnecessary changes to it in the future.
  const socket = useRef();
  if (socket.current === undefined) {
    console.log('No socket set. Creating!');
    socket.current = createSocket();

    // Initialize event listeners on the socket.
    startListening(socket.current);

    // Start polling for changes in connectivity
    const poller = connectionPoller();
    poller.init(socket.current);
  }

  const connection = {
    socket: socket.current,
    nickname,
    setNickname,
    activeRoomCode,
    setActiveRoomCode,
  };

  useEffect(() => {
    console.log(`>> activeRoomCode changed to ${activeRoomCode}`);
  }, [activeRoomCode]);

  useEffect(() => {
    console.log(`>> nickname changed to ${nickname}`);
  }, [nickname]);

  return (
    <ConnectionContext.Provider value={connection}>
      {children}
    </ConnectionContext.Provider>
  );
};

ConnectionContextContainer.propTypes = {
  children: PropTypes.node,
};

export default ConnectionContext;
export { ConnectionContextContainer };
