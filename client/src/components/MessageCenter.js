import { Subject } from 'rxjs';

/**
 * Used to publish and subscribe to messages.
 */
const MessageCenter = new Subject();

/**
 * Used to publish messages.
 * @param {string} topic Which topic is the event related to. Only subscribers to this topic will receive it.
 * @param {*}      data  Message content.
 */
const publish = (topic, data) => MessageCenter.next({ topic, data });

export { publish };
export default MessageCenter;
