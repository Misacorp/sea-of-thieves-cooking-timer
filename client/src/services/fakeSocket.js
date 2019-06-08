import uuid from 'uuid/v4';
import Room from 'sea-of-thieves-cooking-timer-server/lib/types/Room'; // eslint-disable-line import/no-extraneous-dependencies
import Timer from 'sea-of-thieves-cooking-timer-server/lib/types/Timer'; // eslint-disable-line import/no-extraneous-dependencies

import { publish } from '../components/MessageCenter';
import * as actions from '../components/actions/actions';

// Keep track of timers here.
let room;

const addTimers = amount => {
  for (let i = 0; i < amount; i += 1) {
    room.addTimer(new Timer(uuid()));
  }
};

const publishTimerSync = () => {
  publish(actions.TIMER_SYNC, {
    type: actions.TIMER_SYNC,
    id: uuid(),
    timestamp: new Date().toString(),
    timers: room.timers,
  });
};

const fakeSocket = {
  init: () => {
    // console.log('fakeSocket init');

    // Create a new room
    const roomCode = 'LOCL';
    room = new Room(roomCode);
    // Populate it with timers.
    addTimers(4);

    publish(actions.ROOM_CREATED, roomCode);
  },

  // Actions emitted BY the fake socket.
  on: (action, data) => console.log('fakeSocket on:', action, data),

  // Actions that were emitted TO the fake socket.
  emit: (action, data) => {
    // console.log('fakeSocket emit:', action, data);

    switch (action) {
      case actions.REQUEST_TIMERS: {
        publishTimerSync();
        break;
      }

      case actions.START: {
        const { id, food } = data;

        // Start the timer
        room.getTimer(id).start(food);

        // Send a timer sync event
        publishTimerSync();
        break;
      }

      case actions.RESET: {
        const { id } = data;
        room.getTimer(id).reset();

        publishTimerSync();
        break;
      }

      default: {
        publish(actions.GENERIC_MESSAGE, {
          type: actions.GENERIC_MESSAGE,
          id: uuid(),
          timestamp: new Date().toString(),
          message: `fakeSocket has no handler for your action. ${action}`,
        });
      }
    }
  },
};

export default fakeSocket;
