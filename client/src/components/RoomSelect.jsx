import React, {
  useCallback,
  useEffect,
  useContext,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import ls from 'local-storage';

import Button from './Generic/Buttons/Button';
import Input from './Generic/Input/Input';
import LinkButton from './Generic/Buttons/LinkButton';
import Row from './Generic/Containers/Row';
import AdjacentRadioGroup from './Generic/Radio/AdjacentRadioGroup';
import Radio from './Generic/Radio/Radio';

import { ROOM_CREATED } from './actions/actions';
import ConnectionContext from './contexts/ConnectionContext';
import useComms from './hooks/useComms';
import useSubscription from './hooks/useSubscription';

import { ONLINE_ROOT } from '../types/routes';
import { NICKNAME_MAX_LENGTH, ROOM_CODE_LENGTH } from '../constants/config';

const lsKey = 'crewAction';

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

  // Radio options
  const options = ['Create', 'Join'];
  const savedSelection = ls.get(lsKey);
  const defaultSelection = options[savedSelection || 0];
  const [selectedAction, selectAction] = useState(defaultSelection);

  // Handle change of radio input.
  const handleChange = useCallback(
    newIndex => () => {
      selectAction(options[newIndex]);
      ls.set(lsKey, newIndex);
    },
    [selectAction, options],
  );

  /**
   * Allow the user to set a nickname.
   * A maximum length is enforced.
   */
  const handleNicknameChange = event => {
    const newName = event.target.value;
    if (newName.length < NICKNAME_MAX_LENGTH) {
      setNickname(newName);
    }
  };

  /**
   * Validates a nickname.
   * Used before creating or joining a room.
   */
  const nicknameIsValid = () => {
    return (
      typeof nickname === 'string' &&
      nickname.length >= 3 &&
      nickname.length <= NICKNAME_MAX_LENGTH
    );
  };

  /**
   * Allow the user to set a room code
   */
  const [roomCode, setRoomCode] = useState('');
  const handleRoomCodeChange = event => {
    let newRoomCode = event.target.value;

    // Limit room code length
    if (newRoomCode.length <= ROOM_CODE_LENGTH) {
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
      return roomCodeToCheck.length === ROOM_CODE_LENGTH;
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
      <Row center>
        <Input
          id="nickname"
          name="nickname"
          onChange={handleNicknameChange}
          value={nickname}
          placeholder="My name is..."
          required
          label="Nickname"
          variant="inline"
        />
      </Row>

      {nicknameIsValid() && (
        <>
          <Row center>
            <AdjacentRadioGroup>
              <Radio
                align="right"
                label={options[0]}
                group="Create or join a crew?"
                checked={selectedAction === options[0]}
                onChange={handleChange(0)}
              />
              <Radio
                align="left"
                label={options[1]}
                group="Create or join a crew?"
                checked={selectedAction === options[1]}
                onChange={handleChange(1)}
              />
            </AdjacentRadioGroup>
          </Row>

          {selectedAction === options[1] && (
            <Row center>
              <Input
                id="crew_code"
                name="crew_code"
                onChange={handleRoomCodeChange}
                value={roomCode}
                placeholder="Crew code"
                label="Crew code"
                variant="inline"
              />
            </Row>
          )}

          <Row center>
            {selectedAction === options[1] ? (
              <LinkButton
                to={`/online/${roomCode}`}
                variant="inline"
                disabled={!roomCodeIsValid()}
              >
                Go
              </LinkButton>
            ) : (
              <Button
                variant="inline"
                disabled={!nicknameIsValid()}
                onClick={handleCreateRoom}
              >
                Go
              </Button>
            )}
          </Row>
        </>
      )}
    </div>
  );
};

RoomSelectBase.propTypes = {
  className: PropTypes.string,
};

const RoomSelect = styled(RoomSelectBase)`
  position: absolute;
  bottom: 3rem;
  left: 0;
  right: 0;

  ${Input} {
    max-width: 300px;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  ${LinkButton}, ${Button} {
    padding-left: 5rem;
    padding-right: 5rem;
  }
`;

export default RoomSelect;
