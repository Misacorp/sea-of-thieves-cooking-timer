import { useCallback } from 'react';

import useConnection from './useConnection';
import * as actions from '../actions/actions';

/**
 * Custom hook.
 * Provides functionality for other components to communicate with the server.
 * This can help with stale state: https://github.com/facebook/react/issues/15041
 */
const useComms = () => {
  // Get the socket from our context
  const { socket } = useConnection();

  const trySocketAction = useCallback(
    action => {
      if (socket) {
        action();
      } else {
        console.warn('No socket');
      }
    },
    [socket],
  );

  /**
   * Starts a timer with the given id and food.
   * @param {string} id   Id of timer to start.
   * @param {string} food Food indicating timer duration.
   */
  const start = (id, food) => () => {
    trySocketAction(() => socket.emit(actions.START, { id, food }));
  };

  const reset = id => () => {
    trySocketAction(() => socket.emit(actions.RESET, { id }));
  };

  /**
   * Join a room with the given code code
   * @param {string} roomCode Room to join.
   * @param {string} nickname Client nickname
   */
  const joinRoom = (roomCode, nickname) =>
    trySocketAction(() =>
      socket.emit(actions.JOIN_ROOM, { roomCode, nickname }),
    );
  /**
   * Creates a new room.
   */
  const createRoom = nickname =>
    trySocketAction(() => socket.emit(actions.CREATE_ROOM, { nickname }));

  const requestTimers = () => {
    trySocketAction(() => socket.emit(actions.REQUEST_TIMERS));
  };

  return { start, reset, createRoom, joinRoom, requestTimers };
};

export default useComms;
