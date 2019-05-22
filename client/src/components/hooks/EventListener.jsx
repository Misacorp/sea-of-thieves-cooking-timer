import * as actions from '../actions/actionTypes';

/**
 * Event listener that is attached to a socket once one is created.
 * @param {object} socket Socket to listen to changes from.
 */
const EventListener = socket => {
  /**
   * Initializes event listeners.
   * @param {function} addEvent Function that adds events to the event queue.
   */
  const startEventListener = addEvent => {
    socket.on(actions.USER_JOINED, data => {
      console.log('📩 USER_JOINED', data);

      const { nickname, timestamp } = data;
      addEvent({ type: actions.USER_JOINED, timestamp, nickname });
    });

    socket.on(actions.USER_LEFT, data => {
      console.log('📩 USER_LEFT', data);

      const { nickname, timestamp } = data;
      addEvent({ type: actions.USER_LEFT, timestamp, nickname });
    });
  };

  return startEventListener;
};

export default EventListener;
