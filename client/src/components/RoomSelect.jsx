import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { CREATE_ROOM, JOIN_ROOM } from './actions/actionTypes';
import Button from './Generic/Button';
import Input from './Generic/Input';
import Divider from './Generic/Divider';

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
  /**
   * Allow the user to set a nickname
   */
  const [nickname, setNickname] = useState('');
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
      nickname.length <= 16
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
  const roomCodeIsValid = () => {
    return roomCode.length === roomCodeLength;
  };

  /**
   * Pass create room event to its action handler.
   */
  const createRoom = () => {
    if (nicknameIsValid()) {
      console.log(
        `${CREATE_ROOM}: ${nickname || 'Unnamed user'} is creating a room`,
      );
    }
  };

  /**
   * Pass join room eventd to its action handler.
   */
  const joinRoom = () => {
    if (nicknameIsValid() && roomCodeIsValid()) {
      console.log(
        `${JOIN_ROOM}: ${nickname ||
          'Unnamed user'} is joining room ${roomCode}`,
      );
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
            onClick={createRoom}
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
            onClick={joinRoom}
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
