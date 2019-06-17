import React, { useContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import RoomCodeDisplay from './RoomCodeDisplay';
import TimerGrid from './Timers/TimerGrid';
import { ONLINE_ROOT } from '../types/routes';
import { NONEXISTANT_ROOM, USER_JOINED } from './actions/actions';

import useComms from './hooks/useComms';
import useSubscription from './hooks/useSubscription';
import ConnectionContext from './contexts/ConnectionContext';

const OnlineRoom = props => {
  console.log('OnlineRoom props', props);

  const [status, setStatus] = useState('INIT'); // INIT, NONEXISTANT_ROOM, READY

  // If a room does not exist, use a subscription to the NONEXISTANT_ROOM event to redirect the user back to selecting a room.
  const subscriptionSettings = useRef({
    [NONEXISTANT_ROOM]: () => {
      setStatus('NONEXISTANT_ROOM');
    },
    [USER_JOINED]: () => {
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
  const { nickname } = useContext(ConnectionContext);
  const { joinRoom } = useComms();
  useEffect(() => {
    joinRoom(roomCode, nickname);
  }, [joinRoom, roomCode, nickname]);

  if (status === 'INIT') {
    return <p>Joining room...</p>;
  }

  if (status === 'NONEXISTANT_ROOM') {
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
