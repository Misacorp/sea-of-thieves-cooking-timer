import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ls from 'local-storage';

import Button from '../Generic/Buttons/Button';
import Input from '../Generic/Input/Input';
import LinkButton from '../Generic/Buttons/LinkButton';
import Row from '../Generic/Containers/Row';
import AdjacentRadioGroup from '../Generic/Radio/AdjacentRadioGroup';
import Radio from '../Generic/Radio/Radio';

import ConnectionContext from '../contexts/ConnectionContext';
import useComms from '../hooks/useComms';
import { set as saveToLocalStorage } from '../../services/localStorageHandler';
import nicknameIsValid from './validateNickname';
import roomCodeIsValid from './validateRoomCode';

import { NICKNAME_MAX_LENGTH, ROOM_CODE_LENGTH } from '../../constants/config';

const lsKey = 'crewAction';

/**
 * Displays a form where a user can
 *   - Set their nickname
 *   - Create a room
 *     OR
 *   - Enter a room code
 *   - Join that room
 */
const RoomSelectControlsStructure = ({ className }) => {
  const { nickname, setNickname } = useContext(ConnectionContext);

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
    if (newName.length <= NICKNAME_MAX_LENGTH) {
      setNickname(newName);

      if (nicknameIsValid(newName)) {
        // Save valid nickname to localstorage in case of client disconnects
        saveToLocalStorage({ nickname: newName });
      }
    }
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

  // Use our custom useComms hook to communicate with the server.
  const { createRoom } = useComms();

  /**
   * Pass create room event to its action handler.
   */
  const handleCreateRoom = () => {
    if (nicknameIsValid(nickname)) {
      createRoom(nickname);
    }
  };

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

      {nicknameIsValid(nickname) && (
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
                disabled={!roomCodeIsValid(roomCode)}
              >
                Go
              </LinkButton>
            ) : (
              <Button
                variant="inline"
                disabled={!nicknameIsValid(nickname)}
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

const RoomSelectControls = styled(RoomSelectControlsStructure)`
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

RoomSelectControlsStructure.propTypes = {
  className: PropTypes.string,
};

export default RoomSelectControls;
