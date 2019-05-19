import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { USER_JOINED } from '../actions/actionTypes';
import useComms from '../hooks/useComms';
import Message from './Message';
import OnlineContext from '../contexts/OnlineContext';

const MessageDisplayBase = ({ className }) => {
  // Store messages in state.
  const [messages, setMessages] = useState([]);

  // Read the network event stack
  const { events, getEvents } = useComms();
  console.log(events, getEvents());

  /**
   * When a USER_JOINED event is on top of the queue, update our messages array
   * with its details.
   */
  if (events.length > 0 && events[0].event === USER_JOINED) {
    const { nickname, timestamp } = events[0];
    setMessages([...messages, { nickname, timestamp }]);
  }

  useEffect(() => {
    console.log('MessageDisplay events', events);
  });

  return (
    <div className={className}>
      <h3>Messages</h3>
      {messages.map(msg => (
        <Message timestamp={msg.timestamp}>{msg.nickname} joined</Message>
      ))}
    </div>
  );
};

MessageDisplayBase.propTypes = {
  className: PropTypes.string,
};

const MessageDisplay = styled(MessageDisplayBase)`
  &,
  h3 {
    background-color: purple;
    color: white;
  }
`;

export default MessageDisplay;
