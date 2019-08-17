import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ConnectionContext from './contexts/ConnectionContext';

const Structure = ({ className }) => {
  const { socket } = useContext(ConnectionContext);

  const [isConnected, setIsConnected] = useState(socket.connected);
  /**
   * Poll connection status periodically.
   */
  useEffect(() => {
    const timerID = setInterval(() => {
      setIsConnected(socket.connected);
    }, 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  return <div className={className}>Connected: {isConnected ? '✔' : '❌'}</div>;
};

const OnlineIndicator = styled(Structure)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2.5rem;
  text-align: center;
`;

Structure.propTypes = {
  className: PropTypes.string,
};

export default OnlineIndicator;
