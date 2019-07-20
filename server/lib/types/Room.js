class Room {
  constructor(code) {
    this.code = code;
    this.members = {}; // id: { nickname: ___ }
    this.timers = [];
    this.abandonedSince = null;
  }

  getMemberNames() {
    return Object.keys(this.members).map(id => this.members[id].nickname);
  }

  getMemberById(id) {
    return this.members[id];
  }

  addMember(user) {
    this.members[user.id] = user;
    this.abandonedSince = null;
  }

  removeMember(id) {
    delete this.members[id];

    // If the last member was removed, set abandonedSince to a date.
    const memberCount = Object.keys(this.members).length;
    if (memberCount < 1) {
      this.abandonedSince = new Date();
    }
  }

  addTimer(timer) {
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
        return timer;
      }
    }
    throw new Error(`Could not find timer with id ${id}`);
  }
}

export default Room;
