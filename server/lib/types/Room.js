class Room {
  constructor(code) {
    this.code = code;
    this.members = {}; // id: { nickname: ___ }
    this.timers = [];
  }

  getMemberNames() {
    return Object.keys(this.members).map(id => this.members[id].nickname);
  }

  getMemberById(id) {
    return this.members[id];
  }

  addMember(user) {
    this.members[user.id] = user;
  }
}

export default Room;
