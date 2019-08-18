import uuid from 'uuid/v4';

import { publish } from '../MessageCenter';
import {
  INT_CONNECTION_DROPPED,
  INT_CONNECTION_ESTABLISHED,
} from '../actions/actions';

/**
 * Actively polls the socket connection, and publishes messages when the connection changes.
 */
const connectionPoller = () => {
  let timerID;
  let isConnected = false;

  // Reset timer.
  const reset = () => clearInterval(timerID);

  const init = socket => {
    // Clear any previously initialized connection pollers since we don't want duplicates running.
    if (timerID) {
      reset();
    }

    // Set a poller.
    timerID = setInterval(() => {
      const { connected } = socket;

      // Detect change in connectivity
      if (connected !== isConnected) {
        // Connection (re-)established
        if (connected) {
          publish(INT_CONNECTION_ESTABLISHED, {
            type: INT_CONNECTION_ESTABLISHED,
            id: uuid(),
            timestamp: new Date(),
          });
        } else {
          // Connection dropped
          publish(INT_CONNECTION_DROPPED, {
            type: INT_CONNECTION_DROPPED,
            id: uuid(),
            timestamp: new Date(),
          });
        }
      }
      isConnected = connected;
    }, 1000);
  };

  return {
    init,
    reset,
  };
};

export default connectionPoller;
