import React, { useContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import RoomCodeDisplay from './RoomCodeDisplay';
import TimerGrid from './Timers/TimerGrid';
import { ONLINE_ROOT } from '../types/routes';
import { NONEXISTANT_ROOM, USER_JOINED, MEMBER_LIST } from './actions/actions';

import useComms from './hooks/useComms';
import useSubscription from './hooks/useSubscription';
import ConnectionContext from './contexts/ConnectionContext';
import { set as saveToLocalStorage } from '../services/localStorageHandler';

const OnlineRoom = props => {
  const [status, setStatus] = useState('INIT'); // INIT, NONEXISTANT_ROOM, NO_NICKNAME, READY
  const { nickname, setActiveRoomCode } = useContext(ConnectionContext);
  const nicknameValid = nickname && nickname.length > 0;

  const subscriptionSettings = useRef({
    // If a room does not exist, use a subscription to the NONEXISTANT_ROOM event to redirect the user back to selecting a room.
    [NONEXISTANT_ROOM]: () => {
      setStatus('NONEXISTANT_ROOM');
    },
    // On a successful join, update the active room code
    [USER_JOINED]: data => {
      setActiveRoomCode(data.roomCode);
    },
    // When the MEMBER_LIST event is received, the room is ready.
    [MEMBER_LIST]: () => {
      setStatus('READY');
    },
  });
  // Subscribe to the events above.
  useSubscription(subscriptionSettings.current);

  // Get Room Code from the URL.
  const {
    match: {
      params: { roomCode },
    },
  } = props;

  // Attempt to join the room
  const { joinRoom } = useComms();
  const { socket } = useContext(ConnectionContext);
  const { connected } = socket;
  console.log(connected);

  useEffect(() => {
    if (nicknameValid) {
      // Save valid nickname to localstorage in case of client disconnects
      saveToLocalStorage({ nickname });
      joinRoom(roomCode, nickname);
    } else {
      // Don't join if no nickname is set
      setStatus('NO_NICKNAME');
    }
  }, [joinRoom, roomCode, nickname, nicknameValid]);

  if (status === 'INIT') {
    return <p>Joining room...</p>;
  }

  if (status === 'NONEXISTANT_ROOM' || status === 'NO_NICKNAME') {
    return <Redirect to={ONLINE_ROOT} />;
  }

  if (status === 'READY') {
    return (
      <>
        <RoomCodeDisplay />
        <TimerGrid />
      </>
    );
  }

  return <p>Unknown OnlineRoom status</p>;
};

OnlineRoom.propTypes = {
  match: PropTypes.object,
};

export default OnlineRoom;
