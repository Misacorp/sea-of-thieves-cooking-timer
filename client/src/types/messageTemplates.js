import * as actions from '../components/actions/actionTypes';

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

export default messageTemplates;
