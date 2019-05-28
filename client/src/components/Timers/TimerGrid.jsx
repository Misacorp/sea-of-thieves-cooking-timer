import React, { useState, useEffect, useContext } from 'react';

import { START, STOP, PAUSE } from '../actions/actions';
import EventContext from '../contexts/EventContext';
import FourByFourGrid from '../Generic/Grids/FourByFourGrid';
import Timer from './Timer';

// List of events this component subscribes to (and handles).
const subscribedEvents = [START, STOP, PAUSE];

const TimerGrid = () => {
  // Listen for changes in the event queue
  const { events, popEvent } = useContext(EventContext);
  useEffect(() => {
    // console.log('🖥 TimerGrid detected changes in the event queue', events);

    // Add a message if the event is one that warrants a message.
    if (events.length > 0 && subscribedEvents.includes(events[0].type)) {
      console.log('🕓', events[0]);
      popEvent();
    }
  }, [events, popEvent]);

  // Give this component an internal date that refreshes each timer.
  const [, setDate] = useState(new Date());

  // Ticking function to update the stored date.
  const tick = () => {
    setDate(new Date()); // This refreshes the component state and triggers a re-render (?)
  };

  /**
   * Set up an internal interval to call tick()
   * Runs on mount and clears itself on unmount.
   */
  useEffect(() => {
    const timerID = setInterval(() => tick(), 100);

    return function cleanup() {
      clearInterval(timerID);
    };
  }, []); // Only run on 'mount' and 'unmount'.

  return (
    <FourByFourGrid>
      <Timer />
      <Timer />
      <Timer />
      <Timer />
    </FourByFourGrid>
  );
};

export default TimerGrid;
