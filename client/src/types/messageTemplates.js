import * as actions from '../components/actions/actions';

/**
 * Templates for various types of messages.
 */
const messageTemplates = {};

messageTemplates[actions.USER_JOINED] = ({ nickname }) => {
  return `${nickname} joined`;
};

messageTemplates[actions.MEMBER_LIST] = ({ members }) => {
  const memberString = members.join(', ');
  return `Current members: ${memberString}`;
};

messageTemplates[actions.USER_LEFT] = ({ nickname }) => {
  return `${nickname} left`;
};

messageTemplates[actions.NONEXISTANT_ROOM] = ({ roomCode }) => {
  return `Room ${roomCode} doesn't exist`;
};

messageTemplates[actions.TIMER_SYNC] = ({ timers }) => {
  return `Received ${timers.length} timers`;
};

export default messageTemplates;
