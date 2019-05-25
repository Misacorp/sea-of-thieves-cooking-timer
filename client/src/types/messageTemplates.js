import * as actions from '../components/actions/actionTypes';

/**
 * Templates for various types of messages.
 */
const messageTemplates = {};

messageTemplates[actions.USER_JOINED] = nickname => {
  return `${nickname} joined`;
};

messageTemplates[actions.USER_LEFT] = nickname => {
  return `${nickname} left`;
};

export default messageTemplates;
