import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TimeContainer = styled.span`
  padding-right: 2rem;
  width: 10%;
  background-color: pink;
`;

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
  timestamp: PropTypes.object,
  children: PropTypes.node,
};

const Message = styled(MessageBase)``;

export default Message;
