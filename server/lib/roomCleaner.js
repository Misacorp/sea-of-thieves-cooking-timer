import cron from "node-cron";

import { ROOM_LIFETIME, COLORS } from "./constants";

/**
 * Runs a scheduled service that deletes long abandoned rooms.
 */
const roomCleaner = RoomStore => {
  return {
    start: () => {
      // Run every minute
      cron.schedule("* * * * *", () => {
        const rooms = RoomStore.getRooms();
        const roomsArray = Object.keys(rooms);

        let abandoned = 0;
        let deleted = 0;

        roomsArray.forEach(roomKey => {
          const room = rooms[roomKey];

          // Check if the room has been abandoned
          if (room.abandonedSince) {
            abandoned += 1;

            // Calculate the time spent abandoned in seconds
            let timeAbandoned = (new Date() - room.abandonedSince) / 1000;

            // If the time exceeds the defined threshold, delete the room.
            if (timeAbandoned > ROOM_LIFETIME) {
              RoomStore.deleteRoom(roomKey);
              deleted += 1;
            }
          }
        });

        console.log(`[RoomCleaner] Lifetime: ${ROOM_LIFETIME}s`);
        console.log(`  Rooms: ${roomsArray.length || '-'}`);
        console.log(`  ${COLORS.YELLOW}Abandoned: ${abandoned || '-'}`);
        console.log(`  ${COLORS.RED}Deleted: ${deleted || '-'}${COLORS.RESET}`);
      });
    }
  };
};

export default roomCleaner;
