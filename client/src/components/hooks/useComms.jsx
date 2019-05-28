import { useEffect } from 'react';
import io from 'socket.io-client';

import * as actions from '../actions/actions';
import EventListener from './EventListener';

// Connect to the socket
const serverUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:1338'
    : '__heroku_address_here__';

const socket = io(serverUrl);

console.log('Initializing an event listener');
const { startEventListener } = EventListener(socket);

/**
 * Custom hook.
 * Provides functionality for other components to communicate with the server.
 * This can help with stale state: https://github.com/facebook/react/issues/15041
 */
const useComms = () => {
  // Start an event listener that handles incoming events.
  useEffect(() => {
    console.log('useComms registering event listeners');
    startEventListener();
  }, []);

  /**
   * Starts a timer with the given id and food.
   * @param {string} id   Id of timer to start.
   * @param {string} food Food indicating timer duration.
   */
  const start = (id, food) => {
    console.log(actions.START, id, food);
    socket.emit(actions.START, { id, food });
  };

  /**
   * Join a room with the given code code
   * @param {string} roomCode Room to join.
   * @param {string} nickname Client nickname
   */
  const joinRoom = (roomCode, nickname) => {
    socket.emit(actions.JOIN_ROOM, { roomCode, nickname });
  };

  /**
   * Creates a new room.
   */
  const createRoom = nickname => {
    socket.emit(actions.CREATE_ROOM, { nickname });
  };

  return { start, createRoom, joinRoom };
};

export default useComms;
