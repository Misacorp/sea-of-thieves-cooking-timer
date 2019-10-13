import React from 'react';
import { Route } from 'react-router-dom';
// import { uniqueNamesGenerator } from 'unique-names-generator';

import AnimatedSwitch from './AnimatedSwitch/AnimatedSwitch';
import RoomSelect from './RoomSelect/RoomSelect';
import OnlineRoom from './OnlineRoom';
import AppControls from './AppControls';
import OnlineIndicator from './OnlineIndicator';

// import { ConnectionContextContainer } from './contexts/ConnectionContext';
import * as routes from '../types/routes';
// import { get as getFromLocalStorage } from '../services/localStorageHandler';

/**
 * Auto-populate fields in development for faster testing
 */
// const useDebugValues = false;
// let initialNickname = getFromLocalStorage('nickname') || '';
// if (process.env.NODE_ENV === 'development' && useDebugValues) {
//   initialNickname = uniqueNamesGenerator('-', true);
// }

/**
 * User has selected to go Online. This component handles things from there on:
 * - Username selection
 * - Create or join room
 */
const Online = () => {
  return (
    // <ConnectionContextContainer>
    <>
      <AnimatedSwitch>
        <Route
          path={`${routes.ONLINE_ROOT}/:roomCode`}
          component={OnlineRoom}
        />
        <Route path="/" component={RoomSelect} />
      </AnimatedSwitch>

      <AppControls>
        <OnlineIndicator />
      </AppControls>
    </>
    // </ConnectionContextContainer>
  );
};

export default Online;
