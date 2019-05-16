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
    duration: 120,
  },
  TEST: {
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
    this.startDate = null;
  }

  /**
   * Change the current food.
   * @returns {object} This Timer object.
   */
  setFood = newFood => {
    if (Object.keys(foods).includes(newFood)) {
      this.food = newFood;
    }
    return this;
  };

  /**
   * Starts the timer.
   */
  start = () => {
    this.startDate = new Date();
    this.isRunning = true;
  };

  /**
   * Stops the timer and clears any food that was set.
   */
  stop = () => {
    this.food = null;
    this.isRunning = false;
    this.startDate = null;
  };

  /**
   * Returns the time left in this counter.
   */
  getTimeLeft = () => {
    if (this.isRunning) {
      // Calculate time that has elapsed since starting the counter.
      const currentTime = new Date();
      const timeElapsed = currentTime - this.startDate;

      // Calculate seconds that are left
      const timeLeft = foods[this.food].duration - timeElapsed / 1000;

      // Stop the timer if we reach 0
      if (timeLeft <= 0) {
        this.stop();
      }

      return Math.round(timeLeft);
    }

    return 0;
  };
}

export default Timer;
