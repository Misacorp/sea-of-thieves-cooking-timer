import React from 'react';

import Header from './Header';
import TimerGrid from './TimerGrid';
import AppControls from './AppControls';

/**
 * Actual main app content.
 */
const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <TimerGrid />
      <AppControls />
    </React.Fragment>
  );
};

export default Main;
