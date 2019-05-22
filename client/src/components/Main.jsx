import React, { useState } from 'react';

import EventContext from './contexts/EventContext';
import OnlineContext from './contexts/OnlineContext';

import Header from './Header';
import Welcome from './Welcome';
import AppControls from './AppControls';
import MessageDisplay from './MessageDisplay/MessageDisplay';
import TimerGrid from './Timers/TimerGrid';

/**
 * Actual main app content.
 */
const Main = () => {
  // Store an app-wide event queue
  const [events, setEvents] = useState([]);

  // Adds an entry to the event queue by recreating the entire array.
  // This way components that rely on this array can update.
  const addEvent = newEvent =>
    setEvents(prevEvents => [...prevEvents, newEvent]);

  // Remove the first item of an array.
  // Call this when an event has been handled.
  const popEvent = () => {
    setEvents(prevEvents => {
      const cutEvents = prevEvents;
      cutEvents.shift();
      return cutEvents;
    });
  };

  const eventValue = { events, addEvent, popEvent };

  /**
   * Does the user want to be online or not?
   * User can be
   *   - Offline            'OFFLINE'
   *   - Setting up online  'SETUP'
   *   - Online             'ONLINE'
   */
  const [online, setOnline] = useState('SETUP');
  const onlineValue = { online, setOnline }; // Provide this to context consumers.

  return (
    <EventContext.Provider value={eventValue}>
      <OnlineContext.Provider value={onlineValue}>
        <React.Fragment>
          <Header />
          {online === 'SETUP' && <Welcome />}
          {(online === 'OFFLINE' || online === 'ONLINE') && <TimerGrid />}
          <MessageDisplay />
          <AppControls />
        </React.Fragment>
      </OnlineContext.Provider>
    </EventContext.Provider>
  );
};

export default Main;
