import React, { useRef, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import { slideInRight, slideOutRight } from '../Generic/transitionAnimations';
import {
  PAGE_TRANSITION_NAME,
  PAGE_TRANSITION_DURATION,
} from '../../constants/config';
import { ONLINE_ROOT } from '../../types/routes';
import ConnectionContext from '../contexts/ConnectionContext';
import { ROOM_CREATED } from '../actions/actions';
import useSubscription from '../hooks/useSubscription';
import roomCodeIsValid from './validateRoomCode';

import RoomSelectControls from './RoomSelectControls';

/**
 * Room Select page.
 */
const RoomSelectBase = ({ className }) => {
  const { activeRoomCode, setActiveRoomCode } = useContext(ConnectionContext);

  // Subscribe to an event stating a room has been created.
  const subscriptionSettings = useRef({
    [ROOM_CREATED]: createdRoomCode => {
      setActiveRoomCode(createdRoomCode);
    },
  });
  useSubscription(subscriptionSettings.current);

  // If there is an active room code, update the state.
  const [status, setStatus] = useState('INIT');
  useEffect(() => {
    if (activeRoomCode && roomCodeIsValid(activeRoomCode)) {
      setStatus('ROOM_ACTIVE');
    }
  }, [activeRoomCode]);

  // When a room is active, redirect the user to an OnlineRoom component.
  if (status === 'ROOM_ACTIVE') {
    console.log(
      'Status is ROOM_ACTIVE. Redirecting to',
      `${ONLINE_ROOT}/${activeRoomCode}`,
    );
    return <Redirect to={`${ONLINE_ROOT}/${activeRoomCode}`} />;
  }

  return (
    <div className={className}>
      <RoomSelectControls />
    </div>
  );
};

RoomSelectBase.propTypes = {
  className: PropTypes.string,
};

const RoomSelect = styled(RoomSelectBase)`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: block;

  &.${PAGE_TRANSITION_NAME}-enter {
    animation: ${slideInRight} ${PAGE_TRANSITION_DURATION}ms forwards;
  }
  &.${PAGE_TRANSITION_NAME}-exit {
    animation: ${slideOutRight} ${PAGE_TRANSITION_DURATION}ms forwards;
  }
`;

export default RoomSelect;
