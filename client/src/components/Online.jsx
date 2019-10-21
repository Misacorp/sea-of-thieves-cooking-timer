import React from 'react';
import { Route } from 'react-router-dom';
// import { uniqueNamesGenerator } from 'unique-names-generator';

import AnimatedSwitch from './AnimatedSwitch/AnimatedSwitch';
import RoomSelect from './RoomSelect/RoomSelect';
import OnlineRoom from './OnlineRoom';
import AppControls from './AppControls';
import OnlineIndicator from './OnlineIndicator';

import * as routes from '../types/routes';
import useConnection from './hooks/useConnection';

/**
 * User has selected to go Online. This component handles things from there on:
 * - Username selection
 * - Create or join room
 */
const Online = () => {
  // Connect to server
  const { connect, socket } = useConnection();
  console.log('Connecting...');
  connect();
  if (socket) console.log('Connected', socket);

  return (
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
  );
};

export default Online;
