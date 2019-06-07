import uuid from 'uuid/v4';

import { publish } from '../components/MessageCenter';
import * as actions from '../components/actions/actions';

const createTimers = amount => {
  const timers = [];
  for (let i = 0; i < amount; i += 1) {
    timers.push({
      id: uuid(),
      state: 'SELECT',
    });
  }
  return timers;
};

const fakeSocket = {
  init: () => {
    console.log('fakeSocket init');
    publish(actions.ROOM_CREATED, '1337');
  },
  on: (action, data) => console.log('fakeSocket on:', action, data),
  emit: (action, data) => {
    console.log('fakeSocket emit:', action, data);

    switch (action) {
      case actions.REQUEST_TIMERS:
        publish(actions.TIMER_SYNC, {
          type: actions.TIMER_SYNC,
          id: uuid(),
          timestamp: new Date().toString(),
          timers: createTimers(4),
        });
        break;
      default:
        publish(actions.GENERIC_MESSAGE, {
          message: `fakeSocket has no handler for ${action}`,
        });
    }
  },
};

export default fakeSocket;
