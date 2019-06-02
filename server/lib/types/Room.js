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

  addTimer(timer) {
    console.log(`Adding timer to room ${this.code}`, timer);
    this.timers.push(timer);
  }

  /**
   * Get a Timer by id.
   */
  getTimer(id) {
    const iterations = this.timers.length;
    for (let i = 0; i < iterations; i += 1) {
      const timer = this.timers[i];
      if (timer.id === id) {
        console.log("Found the right timer!", timer);
        return timer;
      }
    }
    throw new Error(`Could not find timer with id ${id}`);
  }
}

export default Room;
