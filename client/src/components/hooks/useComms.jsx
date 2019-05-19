import { useState } from 'react';
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
   * Create a queue to store events received by the server.
   * Components can listen for changes in the queue and handle events
   * if they are fit to do so.
   */
  const [events, setEvents] = useState([]);

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

          setEvents(() => {
            // Add the new event to the event queue.
            events.push({ event: actions.USER_JOINED, ...userJoinData });
            // Return a copy of the event queue so that it appears to have changed.
            return events.slice(0);
          });

          console.log('📲 Event stack', events);
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

  return { init, start, createRoom, joinRoom, events };
};

export default useComms;
