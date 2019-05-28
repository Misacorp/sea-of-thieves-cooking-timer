import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  USER_JOINED,
  USER_LEFT,
  MEMBER_LIST,
  NONEXISTANT_ROOM,
} from '../actions/actionTypes';
import useSubscription from '../hooks/useSubscription';
import SingleMessage from './SingleMessage';
import messageTemplates from '../../types/messageTemplates';
import Message from '../../types/message';

// List of events this component subscribes to (and handles).
const MAX_MESSAGES = 7;

const MessageDisplayBase = ({ className }) => {
  // Store messages in state.
  const [messages, setMessages] = useState([]);

  // Subscribe to events that warrant a message.
  const { subscription, subscribeTo } = useSubscription();
  useEffect(() => {
    // Build human-readable messages out of data that is received.
    const handleMessage = data => {
      const { id, type, timestamp, ...otherData } = data;

      // Set the message content via messageTemplates.
      const content = messageTemplates[type](otherData);
      const newMessage = new Message({ id, timestamp, content });

      setMessages(prevMessages => {
        const newMessages = [...prevMessages, newMessage];
        return newMessages;
      });
    };

    subscribeTo({
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
    });

    // Unsubscribe on dismount (actually happens at the end of an update cycle right now, but seems to work).
    const { current } = subscription;
    return () => {
      current.unsubscribe();
    };
  }, [subscribeTo, subscription]);

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
