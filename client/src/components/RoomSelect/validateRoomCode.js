import { ROOM_CODE_LENGTH } from '../../constants/config';

/**
 * Validate roomCode.
 */
const roomCodeIsValid = roomCode => {
  return roomCode.length === ROOM_CODE_LENGTH;
};

export default roomCodeIsValid;
