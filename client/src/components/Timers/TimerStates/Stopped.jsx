import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  padding: 1rem;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const Stopped = ({ stop, className }) => {
  return (
    <div className={className}>
      <p>Timer has stopped</p>
      <Button type="button" onClick={stop}>
        OK
      </Button>
    </div>
  );
};

Stopped.propTypes = {
  stop: PropTypes.func,
  className: PropTypes.string,
};

export default Stopped;
