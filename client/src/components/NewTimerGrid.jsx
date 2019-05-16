import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';

import Socket from './contexts/SocketContext';
import FourByFourGrid from './Generic/Grids/FourByFourGrid';
import Timer from './Timers/NewTimer';

const NewTimerGrid = props => {
  // Create a socket.
  const [socket, setSocket] = useState(null);

  /**
   * Connect to the socket on mount and disconnect on unmount.
   */
  useEffect(() => {
    const { online } = props;
    if (online) {
      console.log('🌷 Connecting to socket');

      // Determine the server URL
      const serverUrl =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:1338'
          : '__heroku_address_here__';

      setSocket(
        openSocket(serverUrl, {
          forceNew: true,
        }),
      );

      return () => {
        console.log('🥀 Disconnecting from socket');
        socket.disconnect(true);
      };
    }

    return undefined;
  }, []);

  /**
   * Monitor changes to socket connection.
   */
  useEffect(() => {
    if (socket) {
      socket.on('disconnect', () => {
        console.log('Socket is DOWN');
      });

      socket.on('connect_error', () => {
        console.log('Socket is DOWN');
      });

      socket.on('connect', () => {
        console.log('Socket is UP');
      });
    }
  }, [socket]);

  // Give this component an internal date that refreshes each timer.
  const [, setDate] = useState(new Date());

  // Ticking function to update the stored date.
  const tick = () => {
    setDate(new Date()); // This refreshes the component state and triggers a re-render (?)
  };

  /**
   * Set up an internal interval to call tick()
   * Runs on mount and clears itself on unmount.
   */
  useEffect(() => {
    const timerID = setInterval(() => tick(), 100);

    return function cleanup() {
      clearInterval(timerID);
    };
  }, []); // Only run on 'mount' and 'unmount'.

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
