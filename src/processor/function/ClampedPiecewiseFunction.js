import LinealFunction from './LinealFunction';

const MIN_FUNCTION_VALUE = 0;
const MAX_FUNCTION_VALUE = 255;

/**
 * This class represents a clamped
 * piecewise function on the interval
 * [0, 255].
 * It always return an integer value
 * on the same interval.
 */
class ClampedPiecewiseFunction {
  intervals = [];
  functions = [];

  constructor() {
    this.intervals.push([MIN_FUNCTION_VALUE, MAX_FUNCTION_VALUE]);
    let firstPoint = {x: MIN_FUNCTION_VALUE, y: MIN_FUNCTION_VALUE};
    let lastPoint  = {x: MAX_FUNCTION_VALUE, y: MAX_FUNCTION_VALUE};
    this.functions.push(new LinealFunction(firstPoint, lastPoint));
  }

  get = x => {
    if (x < MIN_FUNCTION_VALUE || x > MAX_FUNCTION_VALUE)
      throw new Error('value not in range.');
    if (x === MAX_FUNCTION_VALUE) {
      return this.getLastFunction().get(x);
    }
    let indexFound = false, i = 0;
    while (i < this.getNumberOfIntervals() && !indexFound) {
      let interval = this.getInterval(i);
      if (x >= interval[0] && x < interval[1]) {
        indexFound = true;
      } else {
        i += 1;
      }
    }
    return this.getFunction(i).get(x);
  };

  insert = (interval, applyFunction) => {
    if (interval === undefined || applyFunction === undefined) {
      throw new Error("interval or function are undefined");
    }
    this.intervalIsValid(interval);
    let nextToLastInterval = this.getNextToLastInterval();
    let nextToLastFunction = this.getNextToLastFunction();
    this.intervals.pop();

    if (nextToLastInterval === undefined) {
      let interpolation =
          this.getInterpolatedIntervalWithBegin(interval, applyFunction);
      if (interpolation.interval !== null) {
        this.intervals.push(interpolation.interval);
        this.functions.push(interpolation.func);
      }
    } else {
      let interpolated =
          this.getInterpolatedInterval(
              nextToLastInterval, nextToLastFunction, interval, applyFunction);
      if (interpolated.interval !== null) {
        this.intervals.push(interpolated.interval);
        this.functions.push(interpolated.applyFunc);
      }
    }
    this.intervals.push(interval);
    this.functions.push(applyFunction);
    let interpolation =
        this.getInterpolatedIntervalWithEnd(interval, applyFunction);
    if (interpolation.interval !== null) {
      this.intervals.push(interpolation.interval);
      this.functions.push(interpolation.func);
    }
  };

  getNumberOfIntervals = () => {
    return this.intervals.length;
  };

  getInterval = i => {
    if (i < 0 || i > this.getNumberOfIntervals()) {
      return undefined;
    } else {
      return this.intervals[i];
    }
  };

  getLastInterval = () => {
    this.getInterval(this.getNumberOfIntervals() - 1);
  };

  getNextToLastInterval = () => {
    return this.getInterval(this.getNumberOfIntervals() - 2);
  };

  getFunction = i => {
    if (i < 0 || i > this.getNumberOfIntervals()) {
      return undefined;
    } else {
      return this.functions[i];
    }
  };

  getLastFunction = () => {
    return this.getFunction(this.getNumberOfIntervals() - 1);
  };

  getNextToLastFunction = () => {
    return this.getFunction(this.getNumberOfIntervals() - 2);
  };

  intervalIsValid = interval => {
    if (interval[0] >= interval[1]) {
      throw new Error("interval range is not valid");
    }
    interval.each(function(e) {
      if (e < MIN_FUNCTION_VALUE || e > MAX_FUNCTION_VALUE)
        throw new Error("interval is not in range [0, 255]");
    });
    let nextToLastInterval = this.getNextToLastInterval();
    if (nextToLastInterval !== undefined) {
      if (interval[0] < nextToLastInterval[1]) {
        throw new Error("intervals are not ordered.");
      }
    }
  };

  getInterpolatedInterval = (i1, f1, i2, f2) => {
    let interpolatedElem = {
      interval: null,
      func: null
    };
    if (i1[1] !== i2[0]) {
      interpolatedElem.interval = [i1[1], i2[0]];
      let firstPoint = {x: i1[1], y: f1.get(i1[1])};
      let secondPoint = {x: i2[0], y: f2.get(i2[0])};
      interpolatedElem.func = new LinealFunction(firstPoint, secondPoint);
    }
    return interpolatedElem;
  };

  getInterpolatedIntervalWithBegin = (i, f) => {
    let interpolatedElem = {
      interval: null,
      func: null
    };
    if (i[0] !== MIN_FUNCTION_VALUE) {
      interpolatedElem.interval = [MIN_FUNCTION_VALUE, i[0]];
      let firstPoint = {x: MIN_FUNCTION_VALUE, y: MIN_FUNCTION_VALUE};
      let secondPoint = {x: i[0], y: f.get(i[0])};
      interpolatedElem.func = new LinealFunction(firstPoint, secondPoint);
    }
    return interpolatedElem;
  };

  getInterpolatedIntervalWithEnd = (i, f) => {
    let interpolatedElem = {
      interval: null,
      func: null
    };
    if (i[1] !== MAX_FUNCTION_VALUE) {
      interpolatedElem.interval = [i[1], MAX_FUNCTION_VALUE];
      let firstPoint = {x: i[1], y: f.get(i[1])};
      let secondPoint = {x: MAX_FUNCTION_VALUE, y: MAX_FUNCTION_VALUE};
      interpolatedElem.func = new LinealFunction(firstPoint, secondPoint);
    }
    return interpolatedElem;
  };

  getFunctionToApply;
}