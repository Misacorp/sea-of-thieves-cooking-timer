import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import useSubscription from './hooks/useSubscription';
import {
  INT_CONNECTION_DROPPED,
  INT_CONNECTION_ESTABLISHED,
} from './actions/actions';

const Structure = ({ className }) => {
  const [isConnected, setIsConnected] = useState(false);

  const subscriptionSettings = useRef({
    [INT_CONNECTION_ESTABLISHED]: () => {
      setIsConnected(true);
    },
    [INT_CONNECTION_DROPPED]: () => {
      setIsConnected(false);
    },
  });
  // Subscribe to the events above.
  useSubscription(subscriptionSettings.current);

  return <div className={className}>Connected: {isConnected ? '✔' : '❌'}</div>;
};

const OnlineIndicator = styled(Structure)`
  text-align: center;
`;

Structure.propTypes = {
  className: PropTypes.string,
};

export default OnlineIndicator;
