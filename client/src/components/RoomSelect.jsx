import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { uniqueNamesGenerator } from 'unique-names-generator';

import Button from './Generic/Button';
import Input from './Generic/Input';
import Divider from './Generic/Divider';

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
  // Listen for changes in the event queue
  const { events, popEvent } = useContext(EventContext);
  const { setOnline } = useContext(OnlineContext);
  useEffect(() => {
    if (events.length > 0) {
      switch (events[0].type) {
        case ROOM_CREATED:
          setOnline('ONLINE');
          popEvent();
          break;
        case USER_JOINED:
          // If the current user joined a room, set their status to online.
          if (Object.prototype.hasOwnProperty.call(events[0], 'self')) {
            if (events[0].self === true) {
              setOnline('ONLINE');
            }
          }
          // Don't pop an event since MessageDisplay handles it.
          // This system will require tweaking...
          break;
        default:
          break;
      }
    }
  }, [events, popEvent, setOnline]);

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
