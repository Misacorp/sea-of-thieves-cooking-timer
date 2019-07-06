import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ConnectionContext from './contexts/ConnectionContext';

const RoomCodeDisplayBase = ({ className }) => {
  // Get the room code from ConnectionContext
  const connection = useContext(ConnectionContext);
  const { activeRoomCode } = connection;

  return <p className={className}>Room {activeRoomCode}</p>;
};

RoomCodeDisplayBase.propTypes = {
  className: PropTypes.string,
};

const RoomCodeDisplay = styled(RoomCodeDisplayBase)`
  text-align: center;
`;

export default RoomCodeDisplay;
