import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { USER_JOINED, USER_LEFT } from '../actions/actionTypes';
import EventContext from '../contexts/EventContext';
import SingleMessage from './SingleMessage';
import messageTemplates from '../../types/messageTemplates';
import Message from '../../types/message';

// List of events this component subscribes to (and handles).
const subscribedEvents = [USER_JOINED, USER_LEFT];
const MAX_MESSAGES = 7;

const MessageDisplayBase = ({ className }) => {
  // Store messages in state.
  const [messages, setMessages] = useState([]);

  // Listen for changes in the event queue
  const { events, popEvent } = useContext(EventContext);
  useEffect(() => {
    // Add a message if the event is one that warrants a message.
    if (events.length > 0 && subscribedEvents.includes(events[0].type)) {
      const { id, type, timestamp, nickname } = events[0];

      // Set the message content
      const content = messageTemplates[type](nickname);
      const newMessage = new Message({ id, timestamp, content });

      setMessages(prevMessages => {
        const newMessages = [...prevMessages, newMessage];
        popEvent();
        return newMessages;
      });
    }
  }, [events, popEvent]);

  return (
    <div className={className}>
      {// Only show a portion of the latest messages.
      messages.slice(-1 * MAX_MESSAGES).map(msg => (
        <SingleMessage key={`${msg.id}`} timestamp={msg.timestamp}>
          {msg.content}
        </SingleMessage>
      ))}
    </div>
  );
};

MessageDisplayBase.propTypes = {
  className: PropTypes.string,
};

const MessageDisplay = styled(MessageDisplayBase)`
  position: absolute;
  bottom: 2.5rem;
  left: 0.25rem;
  right: 0.25rem;
  text-align: right;
  z-index: 999;
  user-select: none;
  pointer-events: none;

  & span {
    text-align: left;
  }
`;

export default MessageDisplay;
