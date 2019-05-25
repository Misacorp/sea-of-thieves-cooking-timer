class Room {
  constructor(code) {
    this.code = code;
    this.members = {}; // id: { nickname: ___ }
    this.timers = [];
  }

  getMemberById(id) {
    return this.members[id];
  }

  addMember(user) {
    this.members[user.id] = user;
  }
}

export default Room;
