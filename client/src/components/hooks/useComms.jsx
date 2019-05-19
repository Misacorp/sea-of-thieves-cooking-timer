import io from 'socket.io-client';

import * as actions from '../actions/actionTypes';

// Socket details
const serverUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:1338'
    : '__heroku_address_here__';

let socket = null;

/**
 * Custom hook.
 * Provides functionality for other components to communicate with the server.
 */
const useComms = () => {
  /**
   * Initializes network communication.
   * @param {boolean} online Will the app be used online or offline
   */
  const init = online => {
    if (online) {
      console.log('Initializing useComms in ONLINE mode');

      socket = io(serverUrl);
    } else {
      console.log('Initializing useComms in OFFLINE mode');
      socket = 'fakeSocket';
    }
  };

  /**
   * Starts a timer with the given id.
   * @param {string} id Id of timer to start.
   */
  const start = id => {
    console.log(actions.START, id);
  };

  /**
   * Join a room with the given code code
   * @param {string} roomCode Room to join.
   */
  const joinRoom = (nickname, roomCode) => {
    console.log(actions.JOIN_ROOM, { nickname, roomCode });
    socket.emit(actions.JOIN_ROOM, { nickname, roomCode });
    console.log(socket);
  };

  /**
   * Creates a new room.
   */
  const createRoom = () => {
    console.log(actions.CREATE_ROOM);
    socket.emit(actions.CREATE_ROOM, 'lol');
  };

  return { init, start, createRoom, joinRoom };
};

export default useComms;
