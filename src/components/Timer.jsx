import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TimerBase = ({ options, className }) => {
  const { duration, title } = options;

  return (
    <div className={className}>
      <div>
        {title}: {duration}
        Eyy My dudes
      </div>
    </div>
  );
};

const Timer = styled(TimerBase)`
  height: 100%;
  background-color: limegreen;
  position: relative;

  & > * {
    background-color: lightblue;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

TimerBase.propTypes = {
  options: PropTypes.shape({
    duration: PropTypes.number,
    title: PropTypes.string,
  }),
  className: PropTypes.string,
};

export default Timer;
