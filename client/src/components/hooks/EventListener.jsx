import uuid from 'uuid/v4';
import * as actions from '../actions/actionTypes';
import { publish } from '../MessageCenter';

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
    // Someone joined the room.
    socket.on(actions.USER_JOINED, data => {
      console.log('📩 USER_JOINED', data);

      const { nickname, timestamp } = data;
      publish(actions.ROOM_CREATED, { nickname, timestamp });
    });

    // User themself joined a room.
    socket.on(actions.MEMBER_LIST, data => {
      const { timestamp, members } = data;
      addEvent({
        id: uuid(),
        type: actions.MEMBER_LIST,
        timestamp,
        members,
      });
    });

    // Someone else left the room.
    socket.on(actions.USER_LEFT, data => {
      console.log('📩 USER_LEFT', data);

      const { nickname, timestamp } = data;
      addEvent({ id: uuid(), type: actions.USER_LEFT, timestamp, nickname });
    });

    // Room was created.
    socket.on(actions.ROOM_CREATED, data => {
      const { roomCode } = data;
      console.log(`Room ${roomCode} was created and you are now a member`);

      publish(actions.ROOM_CREATED, roomCode);
    });

    // Client tried to join a room that doesn't exist.
    socket.on(actions.NONEXISTANT_ROOM, data => {
      const { roomCode, timestamp } = data;
      addEvent({
        id: uuid(),
        type: actions.NONEXISTANT_ROOM,
        timestamp,
        roomCode,
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
