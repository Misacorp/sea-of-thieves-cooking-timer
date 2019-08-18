import * as actions from '../components/actions/actions';

/**
 * Templates for various types of messages.
 */
const messageTemplates = {};

messageTemplates[actions.USER_JOINED] = data => {
  const { nickname, roomCode } = data;
  return `${nickname} joined room ${roomCode}`;
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

messageTemplates[actions.TIMER_SYNC] = ({ message }) => {
  return message;
};

messageTemplates[actions.GENERIC_MESSAGE] = ({ message }) => {
  return message;
};

messageTemplates[actions.INT_CONNECTION_ESTABLISHED] = () => {
  return 'Connection estabished';
};

messageTemplates[actions.INT_CONNECTION_DROPPED] = () => {
  return 'Connection dropped';
};

export default messageTemplates;
