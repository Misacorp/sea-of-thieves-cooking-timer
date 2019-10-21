import React, { useState, createContext, useRef } from 'react';
import PropTypes from 'prop-types';

import { createSocket, startListening } from '../../services/socketHandler';
import connectionPoller from '../../services/connectionPoller';
import { get as getFromLocalStorage } from '../../services/localStorageHandler';

const ConnectionContext = createContext();
const initialNickname = getFromLocalStorage('nickname') || '';

/**
 * Contains values and functions required in connecting to a server.
 */
const ConnectionContextContainer = ({ children }) => {
  const [activeRoomCode, setActiveRoomCode] = useState();
  const [nickname, setNickname] = useState(initialNickname);
  const [socket, setSocket] = useState();

  /**
   * Creates a socket and connects to the server.
   */
  const connect = () => {
    if (!socket) {
      // Create a socket
      const createdSocket = createSocket();
      startListening(createdSocket);

      // Start polling for changes in connectivity
      const poller = connectionPoller();
      poller.init(createdSocket);

      setSocket(createdSocket);
    }
  };

  const connection = {
    connect,
    socket,
    nickname,
    setNickname,
    activeRoomCode,
    setActiveRoomCode,
  };

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
