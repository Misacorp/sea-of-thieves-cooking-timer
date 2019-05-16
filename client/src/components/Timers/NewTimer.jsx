import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import Socket from '../contexts/SocketContext';
import foods from '../../types/foods';
import TimerButtonGrid from '../Generic/Grids/TimerButtonGrid';
import FoodSelectButton from '../FoodSelectButton';

const NewTimerBase = ({ className }) => {
  // Give the timer a unique unchanging ID throughout the session.
  const id = uuid();

  // Connect to the context's socket
  const socket = useContext(Socket);

  // Keep track of the food being cooked.
  const [food, setFood] = useState(null);

  const [running, setRunning] = useState(false);

  // Asks the server to start the timer with the given food
  const [startDate, setStartDate] = useState(null);
  const start = newFood => () => {
    if (Object.keys(foods).includes(newFood)) {
      socket.emit('start', { id, food: newFood });
    }
  };

  const stop = () => {
    // Tell the server to stop the timer.
    socket.emit('stop', { id });

    // Stop the timer locally. The server will attempt
    // to stop this timer as well so we should be ready for it.
    setRunning(false);
    setFood(null);
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
        stop();
      }

      return Math.round(timeLeft);
    }

    return 0;
  };

  /**
   * Listen to messages from the server.
   */
  if (socket) {
    socket.on('start', data => {
      // Set this timer with the values in data
      if (data.id === id) {
        setFood(data.food);
        setStartDate(new Date(data.date));
        setRunning(true);
      }
    });

    // Stop a timer when the server tells us to.
    socket.on('stop', data => {
      if (data.id === id) {
        setRunning(false);
        setFood(null);
      }
    });
  }

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
      <FoodSelectButton onClick={start('FISH')}>Fish</FoodSelectButton>
      <FoodSelectButton onClick={start('TROPHY_FISH')}>
        Trophy Fish
      </FoodSelectButton>
      <FoodSelectButton onClick={start('MEAT')}>Meat</FoodSelectButton>
      <FoodSelectButton onClick={start('MONSTER_MEAT')}>
        Monster meat
      </FoodSelectButton>
      <FoodSelectButton onClick={start('TEST')}>Test</FoodSelectButton>
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
