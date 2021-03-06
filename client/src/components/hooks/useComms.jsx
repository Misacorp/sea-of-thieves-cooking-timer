import { useContext, useCallback } from 'react';

import ConnectionContext from '../contexts/ConnectionContext';
import * as actions from '../actions/actions';

/**
 * Custom hook.
 * Provides functionality for other components to communicate with the server.
 * This can help with stale state: https://github.com/facebook/react/issues/15041
 */
const useComms = () => {
  // Get the socket from our context
  const { socket } = useContext(ConnectionContext);
  if (!socket) {
    throw new Error('Socket not defined');
  }

  /**
   * Starts a timer with the given id and food.
   * @param {string} id   Id of timer to start.
   * @param {string} food Food indicating timer duration.
   */
  const start = (id, food) => () => {
    socket.emit(actions.START, { id, food });
  };

  const reset = id => () => {
    socket.emit(actions.RESET, { id });
  };

  /**
   * Join a room with the given code code
   * @param {string} roomCode Room to join.
   * @param {string} nickname Client nickname
   */
  const joinRoom = useCallback(
    (roomCode, nickname) => {
      socket.emit(actions.JOIN_ROOM, { roomCode, nickname });
    },
    [socket],
  );

  /**
   * Creates a new room.
   */
  const createRoom = useCallback(
    nickname => {
      if (socket) {
        socket.emit(actions.CREATE_ROOM, { nickname });
      } else {
        console.log('No socket!', socket);
      }
    },
    [socket],
  );

  const requestTimers = () => {
    socket.emit(actions.REQUEST_TIMERS);
  };

  return { start, reset, createRoom, joinRoom, requestTimers };
};

export default useComms;
