import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ConnectionContext from './contexts/ConnectionContext.jsx';

const Structure = ({ className }) => {
  const { socket } = useContext(ConnectionContext);
  const { connected } = socket;

  return <div className={className}>Connected: {connected ? '✔' : '❌'}</div>;
}

const OnlineIndicator = styled(Structure)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2.5rem;
  text-align: center;
`;

OnlineIndicator.propTypes = {
  className: PropTypes.string,
}

export default OnlineIndicator;