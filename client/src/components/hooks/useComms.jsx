import { useEffect, useContext } from 'react';
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

  useEffect(() => {
    startEventListener(addEvent);

    // Cleanup
    return () => socket.off(actions.USER_JOINED);
  }, []);

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

  return { start, createRoom, joinRoom };
};

export default useComms;
