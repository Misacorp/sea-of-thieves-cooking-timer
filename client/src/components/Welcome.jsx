import React from 'react';

import { ONLINE_ROOT, OFFLINE } from '../types/routes';
import LinkButton from './Generic/LinkButton';

/**
 * Welcome page for new users.
 * Displays option to use the timers offline or online.
 */
const Welcome = () => {
  return (
    <React.Fragment>
      <LinkButton to={OFFLINE} variant="inline">
        Offline
      </LinkButton>
      <LinkButton to={ONLINE_ROOT} variant="inline">
        Online
      </LinkButton>
    </React.Fragment>
  );
};

export default Welcome;
