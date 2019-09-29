import uuid from 'uuid/v4';

import { publish } from '../components/MessageCenter';
import {
  INT_CONNECTION_DROPPED,
  INT_CONNECTION_ESTABLISHED,
  INT_CONNECTION_REESTABLISHED,
} from '../components/actions/actions';

/**
 * Actively polls the socket connection, and publishes messages when the connection changes.
 */
const connectionPoller = () => {
  let timerID;
  let isConnected = false;
  let previouslyConnected = false;

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
          // First connection
          if (!previouslyConnected) {
            publish(INT_CONNECTION_ESTABLISHED, {
              type: INT_CONNECTION_ESTABLISHED,
              id: uuid(),
              timestamp: new Date(),
            });
            previouslyConnected = true;
          } else {
            // Re-establishment of previous connection
            publish(INT_CONNECTION_REESTABLISHED, {
              type: INT_CONNECTION_REESTABLISHED,
              id: uuid(),
              timestamp: new Date(),
            });
          }
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
