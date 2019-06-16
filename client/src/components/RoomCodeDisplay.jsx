import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ConnectionContext from './contexts/ConnectionContext';

const RoomCodeDisplayBase = ({ className }) => {
  // Get the room code from ConnectionContext
  const connection = useContext(ConnectionContext);
  const { roomCode } = connection;

  return <p className={className}>Room {roomCode}</p>;
};

RoomCodeDisplayBase.propTypes = {
  className: PropTypes.string,
};

const RoomCodeDisplay = styled(RoomCodeDisplayBase)`
  text-align: center;
`;

export default RoomCodeDisplay;
