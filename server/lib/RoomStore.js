class RoomStore {
  constructor() {
    this.rooms = {};
  }

  getRooms() {
    return this.rooms;
  }

  getRoom(code) {
    return this.rooms[code];
  }

  addRoom(room) {
    const { code } = room;

    // Check if a room already exists with the given code.
    if (!Object.keys(this.rooms).includes(code)) {
      this.rooms[code] = room;
      console.log(`[RoomStore] Added ${code} to rooms:`, this.rooms);
    } else {
      console.log(`[RoomStore] Room ${code} already exists. Rooms:`, this.rooms);
    }
    return Object.keys(this.rooms).length;
  };
}

export default new RoomStore();
