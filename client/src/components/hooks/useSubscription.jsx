import { useRef, useEffect } from 'react';
import { filter } from 'rxjs/operators';

import MessageCenter from '../MessageCenter';

const debug = false;

/**
 * Custom hook.
 * Provides components with a subscription thingy.
 * @param {object} subs Object where keys are topics and values are their callback functions.
 */
const useSubscription = subs => {
  const subscription = useRef();

  useEffect(() => {
    const topics = Object.keys(subs);

    if (debug) console.log('✅ [sub]', topics);

    subscription.current = MessageCenter.pipe(
      filter(({ topic }) => topics.includes(topic)),
    ).subscribe(({ topic, data }) => {
      // Call the topic's callback with the received data.
      subs[topic](data);
    });

    return () => {
      if (debug) console.log('❌ [unsub]', topics);
      subscription.current.unsubscribe();
    };
  }, [subs]);

  return subscription;
};

export default useSubscription;
