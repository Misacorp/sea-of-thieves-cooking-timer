import uuid from 'uuid/v4';

const foods = {
  FISH: {
    duration: 40,
  },
  TROPHY_FISH: {
    duration: 90,
  },
  MEAT: {
    duration: 60,
  },
  MONSTER_MEAT: {
    duration: 2,
  },
  null: {
    duration: 0,
  },
};

/**
 * General Timer data structure.
 * @param {string} food What food the timer is tracking. Null means a selection hasn't been made.
 */
class Timer {
  constructor(food) {
    this.food = food || null;
    this.id = uuid();
    this.isRunning = false;
    this.lastUpdate = null;
    this.timeElapsed = 0;
  }

  /**
   * Change the current food.
   * @returns {object} This Timer object.
   */
  setFood = newFood => {
    if (Object.keys(foods).includes(newFood)) {
      this.food = newFood;
      this.start();
    }
    return this;
  };

  /**
   * Start the timer.
   */
  start = () => {
    console.log('Starting timer');
    this.lastUpdate = new Date();
    this.isRunning = true;
  };

  tick = () => {
    // If the timer is running...
    if (this.isRunning) {
      // And it has fallen behind on ticks...
      const currentTime = new Date();
      this.timeElapsed = currentTime - this.lastUpdate;
    }
  };

  /**
   * Returns the time left in this counter.
   */
  getTimeLeft = () =>
    Math.round(foods[this.food].duration - this.timeElapsed / 1000);
}

export default Timer;
