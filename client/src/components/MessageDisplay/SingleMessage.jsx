import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

/**
 * Displays the timestamp of a given message
 */
const TimeContainer = styled.span`
  padding-right: 0.5rem;
  color: #9f9f9f;
`;

/**
 * Structure of a message.
 */
const MessageBase = ({ className, timestamp, children }) => {
  const date = new Date(timestamp);

  return (
    <p className={className}>
      <TimeContainer>{`${date.getHours()}:${date.getMinutes()}`}</TimeContainer>
      <span>{children}</span>
    </p>
  );
};

MessageBase.propTypes = {
  className: PropTypes.string,
  timestamp: PropTypes.string,
  children: PropTypes.node,
};

// Fade messages out after some time.
const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

/**
 * Styled message structure
 */
const Message = styled(MessageBase)`
  background-color: white;
  display: inline-flex;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  color: ${({ theme }) => theme.palette.typography.dark};
  margin: 0.15rem;
  /* animation: ${fadeOut} 2s ease-out 3s 1 forwards; */
`;

export default Message;
