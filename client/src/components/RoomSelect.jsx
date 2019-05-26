import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { uniqueNamesGenerator } from 'unique-names-generator';
import { filter } from 'rxjs/operators';

import Button from './Generic/Button';
import Input from './Generic/Input';
import Divider from './Generic/Divider';

import MessageCenter from './MessageCenter';
import useComms from './hooks/useComms';
import OnlineContext from './contexts/OnlineContext';
import { USER_JOINED, ROOM_CREATED } from './actions/actionTypes';
import EventContext from './contexts/EventContext';

const roomCodeLength = 4;
let initialNickname = '';
let initialRoomCode = '';

/**
 * Auto-populate fields in development for faster testing
 */
if (process.env.NODE_ENV === 'development') {
  initialNickname = uniqueNamesGenerator('-', true);
  initialRoomCode = '0000';
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
  const { setOnline } = useContext(OnlineContext);

  // Use MessageCenter to subscribe to ROOM_CREATED event.
  const subscription = useRef();
  const subscribedTopics = [ROOM_CREATED, USER_JOINED];
  subscription.current = MessageCenter.pipe(
    filter(({ topic }) => subscribedTopics.includes(topic)),
  ).subscribe(({ topic, data }) => {
    // Separately handle events here.
    switch (topic) {
      case ROOM_CREATED:
        console.log('Room created', data);
        setOnline('ONLINE');
        break;
      case USER_JOINED:
        console.log('Joined room', data);
        setOnline('ONLINE'); // This code duplication is redundant right now. Remove it if it remains so in the future.
        break;
      default:
        throw new Error('RoomSelect is listening to an unnecessary event. ');
    }
  });

  useEffect(() => {
    return () => subscription.current.unsubscribe();
  });

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
