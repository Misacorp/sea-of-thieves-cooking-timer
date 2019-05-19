import io from 'socket.io-client';

import * as actions from '../actions/actionTypes';

// Socket details
const serverUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:1338'
    : '__heroku_address_here__';

let socket = null;

// Try using useReducer for this
// https://codeburst.io/hook-your-component-react-7f3f3994079c
let events = [];
let getEvents = () => events;
/**
 * Custom hook.
 * Provides functionality for other components to communicate with the server.
 * This can help with stale state: https://github.com/facebook/react/issues/15041
 */
const useComms = () => {
  /**
   * Initializes network communication.
   * @param {boolean} online Will the app be used online or offline
   */
  const init = online => {
    if (online) {
      // User wants to be ONLINE.
      console.log('Initializing useComms in ONLINE mode');

      // Register event listeners here.
      socket = io(serverUrl);
      socket.on('connect', () => {
        /**
         * Listen to user join events.
         */
        socket.on(actions.USER_JOINED, userJoinData => {
          console.log(`Received ${actions.USER_JOINED} event`, userJoinData);

          events = [...events, userJoinData];
          getEvents = () => events;

          console.log('useComms events', events);
        });
      });
    } else {
      // User wants to be OFFLINE.
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
  };

  /**
   * Creates a new room.
   */
  const createRoom = () => {
    console.log(actions.CREATE_ROOM);
    socket.emit(actions.CREATE_ROOM, 'lol');
  };

  return { init, start, createRoom, joinRoom, events, getEvents };
};

export default useComms;
