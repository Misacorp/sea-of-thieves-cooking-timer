import uuid from 'uuid/v4';
import * as actions from '../actions/actions';
import { publish } from '../MessageCenter';

/**
 * Event listener that is attached to a socket once one is created.
 * @param {object} socket Socket to listen to changes from.
 */
const EventListener = socket => {
  /**
   * Initializes event listeners.
   */
  const startEventListener = () => {
    // Someone joined the room.
    socket.on(actions.USER_JOINED, data => {
      console.log(data);
      const { nickname, timestamp } = data;
      publish(actions.USER_JOINED, {
        type: actions.USER_JOINED,
        id: uuid(),
        nickname,
        timestamp,
      });
    });

    // User themself joined a room.
    socket.on(actions.MEMBER_LIST, data => {
      const { timestamp, members } = data;
      publish(actions.MEMBER_LIST, {
        type: actions.MEMBER_LIST,
        id: uuid(),
        timestamp,
        members,
      });
    });

    // Someone else left the room.
    socket.on(actions.USER_LEFT, data => {
      const { nickname, timestamp } = data;
      publish(actions.USER_LEFT, {
        type: actions.USER_LEFT,
        id: uuid(),
        nickname,
        timestamp,
      });
    });

    // Room was created.
    socket.on(actions.ROOM_CREATED, data => {
      console.log(data);
      const { roomCode } = data;
      publish(actions.ROOM_CREATED, roomCode);
      console.log(`🚪 Room code: ${roomCode}`);
    });

    // Client tried to join a room that doesn't exist.
    socket.on(actions.NONEXISTANT_ROOM, data => {
      const { roomCode, timestamp } = data;
      publish(actions.NONEXISTANT_ROOM, {
        type: actions.NONEXISTANT_ROOM,
        id: uuid(),
        roomCode,
        timestamp,
      });
    });

    // Server sent timers.
    socket.on(actions.TIMER_SYNC, data => {
      const { timers } = data;
      publish(actions.TIMER_SYNC, {
        type: actions.TIMER_SYNC,
        id: uuid(),
        timestamp: new Date().toString(),
        timers,
      });
    });

    // Generic message
    socket.on(actions.GENERIC_MESSAGE, data => {
      const { message } = data;

      publish(actions.GENERIC_MESSAGE, {
        type: actions.GENERIC_MESSAGE,
        id: uuid(),
        timestamp: new Date().toString(),
        message,
      });
    });
  };

  const removeEventListener = () => {
    socket.off(actions.USER_JOINED);
    socket.off(actions.USER_LEFT);
    socket.off(actions.NONEXISTANT_ROOM);
    socket.off(actions.MEMBER_LIST);
    socket.off(actions.ROOM_CREATED);

    console.log('Removed event listeners');
  };

  return { startEventListener, removeEventListener };
};

export default EventListener;
