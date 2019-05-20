import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { USER_JOINED } from '../actions/actionTypes';
import EventContext from '../contexts/EventContext';
import Message from './Message';

const MessageDisplayBase = ({ className }) => {
  // Store messages in state.
  const [messages, setMessages] = useState([]);

  // Listen for changes in the event queue
  const { events, popEvent } = useContext(EventContext);
  useEffect(() => {
    console.log('🖥 MessageDisplay detected changes in the event queue', events);

    // Add a message if the event is one that warrants a message.
    if (events.length > 0 && events[0].type === USER_JOINED) {
      setMessages(prevMessages => {
        const newMessages = [...prevMessages, events[0]];
        popEvent();
        return newMessages;
      });
    }
  }, [events]);

  return (
    <div className={className}>
      <h3>Messages</h3>
      {messages.map(msg => {
        return (
          <Message timestamp={msg.timestamp}>{msg.nickname} joined</Message>
        );
      })}
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
