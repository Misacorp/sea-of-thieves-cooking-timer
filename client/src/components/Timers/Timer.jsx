import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import foods from '../../types/foods';
import TimerButtonGrid from '../Generic/Grids/TimerButtonGrid';
import FoodSelectButton from './FoodSelectButton';

import audioFile from '../../assets/sound/annoying-vuvuzela-tone.mp3';

const NewTimerBase = ({ className }) => {
  // Give the timer a unique unchanging ID throughout the session.
  const id = uuid();

  // Keep track of the food being cooked.
  const [food, setFood] = useState(null);

  const [running, setRunning] = useState(false);

  // Asks the server to start the timer with the given food
  const [startDate, setStartDate] = useState(null);

  /**
   * Start the timer locally.
   * Used when there is no socket connection or even when there is!
   */
  const localStart = data => {
    setFood(data.food);
    setStartDate(new Date(data.date));
    setRunning(true);
  };

  const startTimer = newFood => () => {
    if (Object.keys(foods).includes(newFood)) {
      console.log(`Timer ${id} wants to start.`);
      // start(id, newFood);
    }
  };

  /**
   * Stop the timer locally.
   * Clears currently set food.
   * Used when there is no socket connection or even when there is!
   */
  const localStop = () => {
    setRunning(false);
    setFood(null);

    const audio = new Audio(audioFile);
    audio.play();
  };

  /**
   * Get remaining time in seconds.
   */
  const getTimeLeft = () => {
    if (running) {
      // Calculate time that has elapsed since starting the counter.
      const currentTime = new Date();
      const timeElapsed = currentTime - startDate;

      // Calculate seconds that are left
      let { duration } = foods[food];

      // Speed times up while in development
      if (process.env.NODE_ENV === 'development') {
        duration *= 0.05;
      }
      const timeLeft = duration - timeElapsed / 1000;

      // Stop the timer if we reach 0
      if (timeLeft <= 0) {
        localStop();
      }

      return Math.round(timeLeft);
    }

    return 0;
  };

  if (food) {
    // If a food is set, the timer is either RUNNING or PAUSED.
    return (
      <div className={className}>
        <p>{food} is cooking</p>
        <h2>{running ? getTimeLeft() : 'PAUSED'}</h2>
      </div>
    );
  }

  return (
    <TimerButtonGrid className={className}>
      <FoodSelectButton onClick={startTimer('FISH')}>Fish</FoodSelectButton>
      <FoodSelectButton onClick={startTimer('TROPHY_FISH')}>
        Trophy Fish
      </FoodSelectButton>
      <FoodSelectButton onClick={startTimer('MEAT')}>Meat</FoodSelectButton>
      <FoodSelectButton onClick={startTimer('MONSTER_MEAT')}>
        Monster meat
      </FoodSelectButton>
    </TimerButtonGrid>
  );
};

NewTimerBase.propTypes = {
  className: PropTypes.string,
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
