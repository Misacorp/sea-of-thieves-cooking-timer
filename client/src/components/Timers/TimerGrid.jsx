import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';

import Socket from '../contexts/SocketContext';
import FourByFourGrid from '../Generic/Grids/FourByFourGrid';
import Timer from './Timer';
import OnlineControls from '../OnlineControls';

const TimerGrid = props => {
  const { online, setOnline } = props;

  // Create a socket.
  const [socket, setSocket] = useState(null);

  /**
   * Connect to the socket if the user goes online.
   */
  useEffect(() => {
    if (online) {
      console.log('🌷 Connecting to socket');

      // Determine the server URL
      const serverUrl =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:1338'
          : '__heroku_address_here__';

      setSocket(openSocket(serverUrl));
    }

    // Disconnect from socket somehow?
  }, [online]);

  /**
   * Monitor changes to socket connection.
   */
  useEffect(() => {
    if (socket) {
      socket.on('disconnect', () => {
        console.log('Socket DISCONNECTED');
      });

      socket.on('connect_error', () => {
        console.log('Socket is DOWN');
      });

      socket.on('connect', () => {
        console.log('Socket CONNECTED');
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
      <OnlineControls online={online} setOnline={setOnline} />
    </Socket.Provider>
  );
};

TimerGrid.propTypes = {
  online: PropTypes.bool,
  setOnline: PropTypes.func,
};

export default TimerGrid;
