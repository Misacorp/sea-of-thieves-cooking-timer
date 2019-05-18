import React, { useState } from 'react';

import OnlineContext from './contexts/OnlineContext';

import Header from './Header';
import Welcome from './Welcome';
import RoomSelect from './RoomSelect';
import NewTimerGrid from './Timers/TimerGrid';
import AppControls from './AppControls';

import Checkbox from './Generic/Checkbox';

/**
 * Actual main app content.
 */
const Main = () => {
  // Does the user want to be online or not?
  const [online, setOnline] = useState(null);

  // Toggle displaying the timer grid
  const [showGrid, setGrid] = useState(true);

  const handleChange = event => {
    setGrid(event.target.checked);
  };

  return (
    <OnlineContext.Provider value={{ online, setOnline }}>
      <Header />
      {online === null && <Welcome />}

      {online === true && <RoomSelect />}

      {/* {showGrid && <NewTimerGrid online={online} setOnline={setOnline} />}
      Show timer grid <Checkbox checked={showGrid} onChange={handleChange} /> */}
      <AppControls />
    </OnlineContext.Provider>
  );
};

export default Main;
