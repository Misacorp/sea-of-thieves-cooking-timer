import io from 'socket.io-client';
import uuid from 'uuid/v4';
import * as actions from '../components/actions/actions';
import { publish } from '../components/MessageCenter';

const createSocket = () => {
  // Connect to the socket
  const serverUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:1338'
      : 'https://sea-of-thieves-cooking-timer.herokuapp.com';

  const socket = io(serverUrl);

  return socket;
};

const startListening = socket => {
  // Someone joined the room.
  socket.on(actions.USER_JOINED, data => {
    const { nickname, timestamp, roomCode } = data;
    publish(actions.USER_JOINED, {
      type: actions.USER_JOINED,
      id: uuid(),
      nickname,
      timestamp,
      roomCode,
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
    const { roomCode } = data;
    publish(actions.ROOM_CREATED, roomCode);
    // console.log(`🚪 Room code: ${roomCode}`);
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
    const { timers, message } = data;
    publish(actions.TIMER_SYNC, {
      type: actions.TIMER_SYNC,
      id: uuid(),
      timestamp: new Date().toString(),
      timers,
      message,
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

const stopListening = socket => {
  socket.off(actions.USER_JOINED);
  socket.off(actions.USER_LEFT);
  socket.off(actions.NONEXISTANT_ROOM);
  socket.off(actions.MEMBER_LIST);
  socket.off(actions.ROOM_CREATED);

  console.log('Removed event listeners');
};

export { createSocket, startListening, stopListening };
export default createSocket;
