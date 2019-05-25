/**
 * Generic message data type to the front end.
 * @param {string} id        Identifier used primarily in React components' key attribute.
 * @param {string} timestamp Timestamp for when the event for this message happened.
 * @param {string} content   Actual message content.
 */
class Message {
  constructor({ id, timestamp, content }) {
    this.id = id;
    this.timestamp = timestamp;
    this.content = content;
  }
}

export default Message;
