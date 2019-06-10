const DEV = process.env.NODE_ENV !== 'production';

/**
 * Foods that can be cooked and their durations.
 */
const foods = {
  FISH: {
    name: 'Fish',
    duration: 40,
  },
  TROPHY_FISH: {
    name: 'Trophy Fish',
    duration: 90,
  },
  MEAT: {
    name: 'Meat',
    duration: 60,
  },
  MONSTER_MEAT: {
    name: 'Monster Meat',
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
      this.startDate = new Date().toString();
      this.duration = foods[food].duration;
      this.foodName = foods[food].name;
      if (DEV) this.duration *= 0.05;
      return this;
    }
    throw new TypeError(`Cannot start a timer with food ${food}`);
  }

  /**
   * Resets a timer
   */
  reset() {
    this.state = 'SELECT';
  }
}

export default Timer;
