import { useRef } from 'react';
import { filter } from 'rxjs/operators';

import MessageCenter from '../MessageCenter';

/**
 * Custom hook.
 * Provides components with a subscription thingy.
 * @param {object} subs Object where keys are topics and values are their callback functions.
 */
const useSubscription = () => {
  const subscription = useRef();

  const subscribeTo = subs => {
    const topics = Object.keys(subs);
    console.log('[useSubscription] subscribing to', topics);

    subscription.current = MessageCenter.pipe(
      filter(({ topic }) => topics.includes(topic)),
    ).subscribe(({ topic, data }) => {
      // Call the topic's callback with the received data.
      subs[topic](data);
    });
  };

  return { subscription, subscribeTo };
};

export default useSubscription;
