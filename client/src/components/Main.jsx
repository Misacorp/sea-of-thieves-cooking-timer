import React, { useState } from 'react';

import Header from './Header';
import NewTimerGrid from './Timers/TimerGrid';
import AppControls from './AppControls';

import Checkbox from './Generic/Checkbox';

/**
 * Actual main app content.
 */
const Main = () => {
  // Does the user want to be online or not?
  const [online, setOnline] = useState(false);

  // Toggle displaying the timer grid
  const [showGrid, setGrid] = useState(true);

  const handleChange = event => {
    setGrid(event.target.checked);
  };

  return (
    <React.Fragment>
      <Header />
      {showGrid && <NewTimerGrid online={online} setOnline={setOnline} />}
      Show timer grid <Checkbox checked={showGrid} onChange={handleChange} />
      <AppControls />
    </React.Fragment>
  );
};

export default Main;
