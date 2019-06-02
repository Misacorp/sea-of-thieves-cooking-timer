import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Running from './TimerStates/Running';
import Stopped from './TimerStates/Stopped';
import Select from './TimerStates/Select';

import audioFile from '../../assets/sound/annoying-vuvuzela-tone.mp3';

const NewTimerBase = ({
  id,
  start,
  stop,
  startDate,
  state,
  duration,
  className,
}) => {
  /**
   * Plays a sound effect.
   */
  const playSound = () => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  /**
   * Get remaining time in seconds.
   */
  const getTimeLeft = () => {
    // Calculate time that has elapsed since starting the counter.
    const currentTime = new Date();
    const startTime = new Date(startDate); // Convert string to date
    const timeElapsed = currentTime - startTime;

    // Speed times up while in development
    let modifiedDuration = duration;
    if (process.env.NODE_ENV === 'development') {
      modifiedDuration *= 0.05;
    }
    const timeLeft = modifiedDuration - timeElapsed / 1000;

    return Math.max(0, Math.round(timeLeft));
  };

  const timeLeft = getTimeLeft();
  if (state === 'RUNNING' && timeLeft > 0) {
    return (
      <Running food="something" timeLeft={timeLeft} className={className} />
    );
  }

  if (state === 'STOPPED' || (timeLeft <= 0 && state === 'RUNNING')) {
    return (
      <Stopped
        stop={() => console.log('Stopping timer')}
        className={className}
      />
    );
  }

  if (state === 'SELECT') {
    return <Select start={start} id={id} className={className} />;
  }

  return <p>Unknown state</p>;
};

NewTimerBase.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  start: PropTypes.func,
  stop: PropTypes.func,
  startDate: PropTypes.string,
  state: PropTypes.string,
  duration: PropTypes.number,
};

const NewTimer = styled(NewTimerBase)`
  height: calc(100% - 0.5rem);
  width: calc(100% - 0.5rem);
  padding: 0.1rem;
  margin: 0.25rem;
  background-color: ${({ theme }) => theme.palette.primary.dark};

  text-align: center;
`;

export default NewTimer;
