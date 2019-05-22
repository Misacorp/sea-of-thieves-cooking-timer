import React, { useState, useContext } from 'react';

import OnlineContext from './contexts/OnlineContext';
import RoomSelect from './RoomSelect';
import Button from './Generic/Button';

/**
 * Welcome page for new users.
 * Displays option to use the timers offline or online.
 */
const Welcome = () => {
  const { setOnline } = useContext(OnlineContext);
  const [setupState, setSetupState] = useState('ONLINE_SELECT');

  const goOffline = () => {
    console.log('Selected offline');
    setOnline('OFFLINE');
  };

  const goOnline = () => {
    console.log('Selected online');
    setSetupState('ROOM_SELECT');
  };

  return (
    <React.Fragment>
      {setupState === 'ONLINE_SELECT' && (
        <React.Fragment>
          <Button onClick={goOffline}>Offline</Button>
          <Button onClick={goOnline}>Online</Button>
        </React.Fragment>
      )}
      {setupState === 'ROOM_SELECT' && (
        <React.Fragment>
          <RoomSelect />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Welcome;
