import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import AppControls from './AppControls';

import Welcome from './Welcome';
import Offline from './Offline';
import Online from './Online';
import MessageDisplay from './MessageDisplay/MessageDisplay';
import * as routes from '../types/routes';

/**
 * Actual main app content.
 */
const Main = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={routes.OFFLINE} component={Offline} />
        <Route path={routes.ONLINE_ROOT} component={Online} />
        <Route path={routes.ROOT} component={Welcome} />
      </Switch>
      <MessageDisplay />
      <AppControls />
    </>
  );
};

export default Main;
