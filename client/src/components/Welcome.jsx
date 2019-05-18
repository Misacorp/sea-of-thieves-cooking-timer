import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import OnlineContext from './contexts/OnlineContext';
import Button from './Generic/Button';

/**
 * Welcome page for new users.
 * Displays option to use the timers offline or online.
 */
const Welcome = () => {
  const { setOnline } = useContext(OnlineContext);

  const goOffline = () => {
    setOnline(false);
  };

  const goOnline = () => {
    setOnline(true);
  };

  return (
    <React.Fragment>
      <Button onClick={goOffline}>Offline</Button>
      <Button onClick={goOnline}>Online</Button>
    </React.Fragment>
  );
};

export default Welcome;
