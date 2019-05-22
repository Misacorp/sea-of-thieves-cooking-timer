import { useContext } from 'react';
import io from 'socket.io-client';

import * as actions from '../actions/actionTypes';
import EventContext from '../contexts/EventContext';
import EventListener from './EventListener';

// Connect to the socket
const serverUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:1338'
    : '__heroku_address_here__';

const socket = io(serverUrl);
const startEventListener = EventListener(socket);

/**
 * Custom hook.
 * Provides functionality for other components to communicate with the server.
 * This can help with stale state: https://github.com/facebook/react/issues/15041
 */
const useComms = () => {
  // Using EventContext
  const eventContext = useContext(EventContext);
  const { addEvent } = eventContext;

  // Start an event listener that handles incoming events.
  startEventListener(addEvent);

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
   * @param {string} nickname Client nickname
   */
  const joinRoom = (roomCode, nickname) => {
    socket.emit(actions.JOIN_ROOM, { roomCode, nickname });
  };

  /**
   * Creates a new room.
   */
  const createRoom = () => {
    socket.emit(actions.CREATE_ROOM, 'lol');
  };

  return { start, createRoom, joinRoom };
};

export default useComms;
