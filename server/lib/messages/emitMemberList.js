// Notify client that they arrived and who else is in the room
const emitMemberList = (client, room) => {
  client.emit("MEMBER_LIST", {
    timestamp: new Date(),
    members: room.getMemberNames()
  });
};

export default emitMemberList;
