import { NICKNAME_MAX_LENGTH } from '../../constants/config';

/**
 * Validates a nickname.
 */
const nicknameIsValid = name => {
  return (
    typeof name === 'string' &&
    name.length >= 3 &&
    name.length <= NICKNAME_MAX_LENGTH
  );
};

export default nicknameIsValid;
