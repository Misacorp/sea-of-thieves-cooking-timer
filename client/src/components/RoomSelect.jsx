import PropTypes from 'prop-types';
import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { uniqueNamesGenerator } from 'unique-names-generator';
import { ROOM_CREATED, USER_JOINED } from './actions/actions';
import ConnectionContext from './contexts/ConnectionContext';
import Button from './Generic/Button';
import Divider from './Generic/Divider';
import Input from './Generic/Input';
import useComms from './hooks/useComms';
import useSubscription from './hooks/useSubscription';

const roomCodeLength = 4;
let initialNickname = '';
let initialRoomCode = '';

/**
 * Auto-populate fields in development for faster testing
 */
if (process.env.NODE_ENV === 'development') {
  initialNickname = uniqueNamesGenerator('-', true);
  initialRoomCode = '';
}

/**
 * Displays a form where a user can
 *   - Set their nickname
 *   - Create a room
 *     OR
 *   - Enter a room code
 *   - Join that room
 */
const RoomSelectBase = ({ className }) => {
  const { dispatch } = useContext(ConnectionContext);

  // Store our subscription settings in a ref. We don't want to change these over the course of the component's lifetime.
  const subscriptionSettings = useRef({
    [ROOM_CREATED]: roomCode => {
      dispatch({ type: 'ONLINE', roomCode });
    },
    [USER_JOINED]: data => {
      const { roomCode } = data;
      dispatch({ type: 'ONLINE', roomCode });
    },
  });
  // Subscribe to the events above.
  useSubscription(subscriptionSettings.current);

  /**
   * Allow the user to set a nickname
   */
  const [nickname, setNickname] = useState(initialNickname);
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
  const [roomCode, setRoomCode] = useState(initialRoomCode);
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
  const roomCodeIsValid = () => {
    return roomCode.length === roomCodeLength;
  };

  // Use our custom useComms hook to communicate with the server.
  const { createRoom, joinRoom } = useComms();

  /**
   * Pass create room event to its action handler.
   */
  const handleCreateRoom = () => {
    if (nicknameIsValid()) {
      createRoom(nickname);
    }
  };

  /**
   * Pass join room eventd to its action handler.
   */
  const handleJoinRoom = () => {
    if (nicknameIsValid() && roomCodeIsValid()) {
      joinRoom(roomCode, nickname);
    }
  };

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
            onClick={handleCreateRoom}
            disabled={!nicknameIsValid()}
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
          <Button
            variant="main"
            onClick={handleJoinRoom}
            disabled={!roomCodeIsValid()}
          >
            Join room
          </Button>
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
