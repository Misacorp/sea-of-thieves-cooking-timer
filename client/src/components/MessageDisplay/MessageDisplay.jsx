import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  USER_JOINED,
  USER_LEFT,
  MEMBER_LIST,
  NONEXISTANT_ROOM,
  TIMER_SYNC,
  GENERIC_MESSAGE,
  INT_CONNECTION_DROPPED,
  INT_CONNECTION_ESTABLISHED,
} from '../actions/actions';
import useSubscription from '../hooks/useSubscription';
import SingleMessage from './SingleMessage';
import messageTemplates from '../../types/messageTemplates';
import Message from '../../types/message';

// List of events this component subscribes to (and handles).
const MAX_MESSAGES = 7;

const MessageDisplayBase = ({ className }) => {
  // Store messages in state.
  const [messages, setMessages] = useState([]);

  // Build human-readable messages out of data that is received.
  const handleMessage = data => {
    const { id, type, timestamp, ...otherData } = data;

    // Set the message content via messageTemplates.
    const content = messageTemplates[type](otherData);
    const newMessage = new Message({
      id,
      timestamp: timestamp.toString(), // Some timestamps are JSON encoded, others aren't.
      content,
    });

    setMessages(prevMessages => {
      const newMessages = [...prevMessages, newMessage];
      return newMessages;
    });
  };

  // Store our subscription settings in a ref. We don't want to change these over the course of the component's lifetime.
  const subscriptionSettings = useRef({
    [USER_JOINED]: data => {
      handleMessage(data);
    },
    [USER_LEFT]: data => {
      handleMessage(data);
    },
    [MEMBER_LIST]: data => {
      handleMessage(data);
    },
    [NONEXISTANT_ROOM]: data => {
      handleMessage(data);
    },
    [TIMER_SYNC]: data => {
      if (data.message) handleMessage(data);
    },
    [GENERIC_MESSAGE]: data => {
      handleMessage(data);
    },
    [INT_CONNECTION_DROPPED]: data => {
      handleMessage(data);
    },
    [INT_CONNECTION_ESTABLISHED]: data => {
      handleMessage(data);
    },
  });
  // Subscribe to the events above.
  useSubscription(subscriptionSettings.current);

  return (
    <div className={className}>
      {// Only show a portion of the latest messages.
      messages.slice(MAX_MESSAGES * -1).map(msg => (
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
