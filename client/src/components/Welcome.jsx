import React, { useState, useContext } from 'react';

import ConnectionContext from './contexts/ConnectionContext';
import RoomSelect from './RoomSelect';
import Button from './Generic/Button';

/**
 * Welcome page for new users.
 * Displays option to use the timers offline or online.
 */
const Welcome = () => {
  const { dispatch } = useContext(ConnectionContext);
  const [setupState, setSetupState] = useState('ONLINE_SELECT');

  const goOffline = () => {
    console.log('[Welcome] going offline');
    dispatch({ type: 'OFFLINE' });
  };

  const goOnline = () => {
    dispatch({ type: 'ONLINE_SETUP' });
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
