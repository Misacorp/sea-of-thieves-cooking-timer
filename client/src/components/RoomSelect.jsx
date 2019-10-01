import React, {
  useCallback,
  useEffect,
  useContext,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';

import { ROOM_CREATED } from './actions/actions';
import ConnectionContext from './contexts/ConnectionContext';
import Button from './Generic/Buttons/Button';
import Divider from './Generic/Divider';
import Input from './Generic/Input';
import useComms from './hooks/useComms';
import useSubscription from './hooks/useSubscription';

import { ONLINE_ROOT } from '../types/routes';

const roomCodeLength = 4;

/**
 * Displays a form where a user can
 *   - Set their nickname
 *   - Create a room
 *     OR
 *   - Enter a room code
 *   - Join that room
 */
const RoomSelectBase = ({ className }) => {
  const {
    nickname,
    setNickname,
    activeRoomCode,
    setActiveRoomCode,
  } = useContext(ConnectionContext);

  /**
   * Allow the user to set a nickname
   */

  const handleNicknameChange = event => {
    const newName = event.target.value;
    setNickname(newName);
  };

  /**
   * Validates a nickname.
   * Used before creating or joining a room.
   */
  const nicknameIsValid = () => {
    return (
      typeof nickname === 'string' &&
      nickname.length >= 3 &&
      nickname.length <= 32
    );
  };

  /**
   * Allow the user to set a room code
   */
  const [roomCode, setRoomCode] = useState('');
  const handleRoomCodeChange = event => {
    let newRoomCode = event.target.value;

    // Limit room code length
    if (newRoomCode.length <= roomCodeLength) {
      newRoomCode = newRoomCode.toUpperCase();
      setRoomCode(newRoomCode);
    }
  };

  /**
   * Validate roomCode.
   */
  const roomCodeIsValid = useCallback(
    roomCodeParam => {
      const roomCodeToCheck = roomCodeParam || roomCode;
      return roomCodeToCheck.length === roomCodeLength;
    },
    [roomCode],
  );

  // Use our custom useComms hook to communicate with the server.
  const { createRoom } = useComms();

  /**
   * Pass create room event to its action handler.
   */
  const handleCreateRoom = () => {
    if (nicknameIsValid()) {
      createRoom(nickname);
    }
  };

  // Subscribe to relevant events.
  const subscriptionSettings = useRef({
    [ROOM_CREATED]: createdRoomCode => {
      setActiveRoomCode(createdRoomCode);
    },
  });
  // Subscribe to the events above.
  useSubscription(subscriptionSettings.current);

  // If there is an active room code, redirect the user to an OnlineRoom component.
  const [status, setStatus] = useState('INIT');
  useEffect(() => {
    if (activeRoomCode && roomCodeIsValid(activeRoomCode)) {
      setStatus('ROOM_ACTIVE');
    }
  }, [activeRoomCode, roomCodeIsValid]);

  if (status === 'ROOM_ACTIVE') {
    return <Redirect to={`${ONLINE_ROOT}/${activeRoomCode}`} />;
  }

  // Otherwise display the Room Select form
  return (
    <div className={className}>
      <Input
        type="text"
        onChange={handleNicknameChange}
        value={nickname}
        placeholder="My name is..."
        aria-label="Nickname"
        aria-required="true"
        style={{ marginBottom: '4rem' }}
      />

      {nicknameIsValid() && (
        <React.Fragment>
          <Button
            variant="main"
            disabled={!nicknameIsValid()}
            onClick={handleCreateRoom}
          >
            Create room
          </Button>

          <Divider>OR</Divider>

          <Input
            type="text"
            onChange={handleRoomCodeChange}
            value={roomCode}
            placeholder="Room code"
            aria-label="Room code"
          />
          <Link to={`/online/${roomCode}`}>
            <Button variant="main" disabled={!roomCodeIsValid()}>
              Join room
            </Button>
          </Link>
        </React.Fragment>
      )}
    </div>
  );
};

RoomSelectBase.propTypes = {
  className: PropTypes.string,
};

const RoomSelect = styled(RoomSelectBase)``;

export default RoomSelect;
