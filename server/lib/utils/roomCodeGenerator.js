const CHARACTERS = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
const charactersLength = CHARACTERS.length;

const makeRoomCode = (length = 4) => {
  let code = "";

  for (let i = 0; i < length; i += 1) {
    code += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
  }

  return code;
};

export default makeRoomCode;