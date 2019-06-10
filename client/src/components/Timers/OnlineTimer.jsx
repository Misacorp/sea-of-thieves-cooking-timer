import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import useComms from '../hooks/useComms';
import Running from './TimerStates/Running';
import Stopped from './TimerStates/Stopped';
import Select from './TimerStates/Select';

import audioFile from '../../assets/sound/annoying-vuvuzela-tone.mp3';

const OnlineTimer = ({ id, startDate, state, duration, className }) => {
  const { start, reset } = useComms();
  const [soundHasPlayed, setSoundHasPlayed] = useState(false);

  // When a new start date is given, reset sound so that it can be played.
  useEffect(() => {
    setSoundHasPlayed(false);
  }, [startDate]);

  /**
   * Plays a sound effect.
   */
  const playSound = () => {
    const audio = new Audio(audioFile);
    audio.play();
    setSoundHasPlayed(true);
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
    const timeLeft = duration - timeElapsed / 1000;

    return Math.max(0, Math.round(timeLeft));
  };

  const timeLeft = getTimeLeft();

  // Play sound if time has run out
  if (timeLeft <= 0 && !soundHasPlayed) {
    playSound();
  }

  if (state === 'RUNNING' && timeLeft > 0) {
    return (
      <Running food="something" timeLeft={timeLeft} className={className} />
    );
  }

  /**
   * If timer is stopped (has just finished and needs to be reset)
   */
  if (state === 'STOPPED' || (timeLeft <= 0 && state === 'RUNNING')) {
    return <Stopped reset={reset(id)} className={className} />;
  }

  /**
   * If timer is idle.
   */
  if (state === 'SELECT') {
    return <Select start={food => start(id, food)} className={className} />;
  }

  return <p>Unknown state</p>;
};

OnlineTimer.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  startDate: PropTypes.string,
  state: PropTypes.string,
  duration: PropTypes.number,
};

const NewTimer = styled(OnlineTimer)`
  height: calc(100% - 0.5rem);
  width: calc(100% - 0.5rem);
  padding: 0.1rem;
  margin: 0.25rem;
  background-color: ${({ theme }) => theme.palette.primary.dark};

  text-align: center;
`;

export default NewTimer;
