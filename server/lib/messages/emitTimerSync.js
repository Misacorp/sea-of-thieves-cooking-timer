/**
 * Emits a timer sync event.
 * @param {object} client Client to submit the event to.
 * @param {object} room   Room whose timers to submit
 */
const emitTimerSync = (client, room) => {
  client.emit("TIMER_SYNC", {
    timestamp: new Date(),
    timers: room.timers
  });
};

export default emitTimerSync;
