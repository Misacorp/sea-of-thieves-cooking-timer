import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { USER_JOINED, USER_LEFT } from '../actions/actionTypes';
import EventContext from '../contexts/EventContext';
import Message from './Message';

// List of events this component subscribes to (and handles).
const subscribedEvents = [USER_JOINED, USER_LEFT];

const MessageDisplayBase = ({ className }) => {
  // Store messages in state.
  const [messages, setMessages] = useState([]);

  // Listen for changes in the event queue
  const { events, popEvent } = useContext(EventContext);
  useEffect(() => {
    console.log('🖥 MessageDisplay detected changes in the event queue', events);

    // Add a message if the event is one that warrants a message.
    if (events.length > 0 && subscribedEvents.includes(events[0].type)) {
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
          <Message timestamp={msg.timestamp}>
            {msg.nickname}: {msg.type}
          </Message>
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
