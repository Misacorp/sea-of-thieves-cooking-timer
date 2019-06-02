const DEV = true;

/**
 * Foods that can be cooked and their durations.
 */
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
}

class Timer {
  constructor(id) {
    this.id = id;
    this.state = 'SELECT';
    this.startDate;
    this.duration;
  }

  /**
   * Starts a timer with the given food.
   */
  start(food) {
    if (Object.keys(foods).includes(food)) {
      this.state = 'RUNNING';
      this.startDate = new Date();
      this.duration = foods[food].duration;
      if (DEV) this.duration *= 0.5;
      return this;
    }
    throw new TypeError(`Cannot start a timer with food ${food}`);
  }
}

export default Timer;
