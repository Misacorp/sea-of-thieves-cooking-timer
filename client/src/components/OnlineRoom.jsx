import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import RoomCodeDisplay from './RoomCodeDisplay';
import TimerGrid from './Timers/TimerGrid';
import { ONLINE_ROOT } from '../types/routes';
import {
  NONEXISTANT_ROOM,
  USER_JOINED,
  MEMBER_LIST,
  INT_CONNECTION_REESTABLISHED,
} from './actions/actions';

import useComms from './hooks/useComms';
import useSubscription from './hooks/useSubscription';
import ConnectionContext from './contexts/ConnectionContext';

const OnlineRoom = props => {
  const { nickname, activeRoomCode, setActiveRoomCode } = useContext(
    ConnectionContext,
  );
  const { joinRoom } = useComms();
  const [status, setStatus] = useState('INIT'); // INIT, NONEXISTANT_ROOM, NO_NICKNAME, READY
  const nicknameValid = nickname && nickname.length > 0;

  const attemptToJoin = useCallback(
    code => {
      if (nicknameValid) {
        console.log(`Joining room ${code}`);
        joinRoom(code, nickname);
      } else {
        // Don't join if no nickname is set
        console.log(`Can't join room. Nickname is not set.`, nickname);
        setStatus('NO_NICKNAME');
      }
    },
    [joinRoom, nicknameValid, nickname],
  );

  const subscriptionSettings = useRef({
    // If a room does not exist, use a subscription to the NONEXISTANT_ROOM event to redirect the user back to selecting a room.
    [NONEXISTANT_ROOM]: () => {
      console.log('[NONEXISTANT_ROOM] Setting activeRoomCode to null.');
      setActiveRoomCode(null);
      setStatus('NONEXISTANT_ROOM');
    },
    // On a successful join, update the active room code
    [USER_JOINED]: data => {
      console.log(`[USER_JOINED] Setting activeRoomCode to ${data.roomCode}`);
      setActiveRoomCode(data.roomCode);
    },
    // When the MEMBER_LIST event is received, the room is ready.
    [MEMBER_LIST]: () => {
      console.log(
        '[MEMBER_LIST] User list received. Everything is good to go!',
      );
      setStatus('READY');
    },
    [INT_CONNECTION_REESTABLISHED]: () => {
      console.log(
        `Connection re-established. activeRoomCode is ${activeRoomCode}`,
      );

      if (activeRoomCode) {
        console.log(
          'Since an active room code exists, we will try to rejoin the room.',
        );

        attemptToJoin(activeRoomCode);
      } else {
        console.log(
          'Since no active room code exists, we will set the status to NONEXISTANT_ROOM',
        );
        setStatus('NONEXISTANT_ROOM');
      }
      // setConnected(true);
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

  // On component mount, attempt to join the room code in the URL
  useEffect(() => {
    console.log(`Component mounted. Attempting to join room ${roomCode}.`);
    attemptToJoin(roomCode);
  }, [attemptToJoin, roomCode]);

  // console.log(`OnlineRoom rendering time. Status is ${status}`);

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
