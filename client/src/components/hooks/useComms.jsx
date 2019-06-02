import { useContext } from 'react';

import ConnectionContext from '../contexts/ConnectionContext';
import * as actions from '../actions/actions';

/**
 * Custom hook.
 * Provides functionality for other components to communicate with the server.
 * This can help with stale state: https://github.com/facebook/react/issues/15041
 */
const useComms = () => {
  // Get the socket from our context
  const { connection } = useContext(ConnectionContext);
  const { socket } = connection;

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
  const joinRoom = (roomCode, nickname) => {
    socket.emit(actions.JOIN_ROOM, { roomCode, nickname });
  };

  /**
   * Creates a new room.
   */
  const createRoom = nickname => {
    if (socket) {
      socket.emit(actions.CREATE_ROOM, { nickname });
    } else {
      console.log('No socket!', socket);
    }
  };

  return { start, reset, createRoom, joinRoom };
};

export default useComms;
