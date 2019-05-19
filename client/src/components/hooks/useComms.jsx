import { useEffect, useContext } from 'react';
import io from 'socket.io-client';

import * as actions from '../actions/actionTypes';

import OnlineContext from '../contexts/OnlineContext';
import EventContext from '../contexts/EventContext';

/**
 * Custom hook.
 * Provides functionality for other components to communicate with the server.
 * This can help with stale state: https://github.com/facebook/react/issues/15041
 */
const useComms = () => {
  // Using EventContext
  const eventContext = useContext(EventContext);
  const { addEvent } = eventContext;

  const { socket } = useContext(OnlineContext);

  useEffect(() => {
    socket.on(actions.USER_JOINED, data => {
      console.log('useComms received USER_JOINED event', data);
      addEvent({ type: actions.USER_JOINED, ...data });
    });

    // Cleanup
    return () => socket.off(actions.USER_JOINED);
  }, [socket]);

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
