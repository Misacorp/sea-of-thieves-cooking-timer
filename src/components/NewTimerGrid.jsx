import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import Socket from './contexts/SocketContext';
import FourByFourGrid from './Generic/Grids/FourByFourGrid';
import Timer from './Timers/NewTimer';

const NewTimerGrid = () => {
  let socket;
  useEffect(() => {
    // Connect to socket here
    console.log('🌷 Connecting to socket');
    socket = io();

    return () => {
      // Disconnect from socket here
      console.log('🥀 Disconnecting from socket');
    };
  }, []);

  return (
    <Socket.Provider value={socket}>
      <FourByFourGrid>
        <Timer />
        <Timer />
        <Timer />
        <Timer />
      </FourByFourGrid>
    </Socket.Provider>
  );
};

export default NewTimerGrid;
