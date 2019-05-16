import React from 'react';

import Header from './Header';
import NewTimerGrid from './Timers/TimerGrid';
import AppControls from './AppControls';

/**
 * Actual main app content.
 */
const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <NewTimerGrid />
      <AppControls />
    </React.Fragment>
  );
};

export default Main;
