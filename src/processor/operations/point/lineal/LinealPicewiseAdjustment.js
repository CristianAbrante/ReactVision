import ProcessImage from '../../../image/ProcessImage';
import LinealFunction from './LinealFunction';

const FUNCTION_MIN = ProcessImage.MIN_PIXEL_VALUE;
const FUNCTION_MAX = ProcessImage.MAX_PIXEL_VALUE - 1;

class LinealPicewiseAdjustment {
  points;
  functions;

  constructor() {
    let p1 =
        {x: FUNCTION_MIN,  y: FUNCTION_MIN};
    let p2 =
        {x: FUNCTION_MAX, y: FUNCTION_MAX};
    this.points = [p1, p2];
    this.setFunctions();
  }

  insert = point => {
    if (!this.valueIsValid(point.x) || !this.valueIsValid(point.y))
      throw new Error('point has not valid values: ' + point.x + " " + point.y);

    if (point.x === FUNCTION_MAX) {
      this.points.pop();
      this.points.push(point);
    } else {
      let insertionIndex = this.getIntervalIndex(point.x);
      if (this.points[insertionIndex - 1].x === point.x) {
        this.points.splice(insertionIndex - 1, 1, point);
      } else {
        this.points.splice(insertionIndex, 0, point);
      }
    }
    this.setFunctions();
  };

  perform = level => {
    if (!this.valueIsValid(level)) {
      throw new Error('level is not in range.');
    }
    let functionIndex = this.getIntervalIndex(level) - 1;
    let value = this.functions[functionIndex].get(level);
    return this.clampValue(value);
  };

  getIntervalIndex = value => {
    for (let i = 1; i < this.points.length; i++) {
      if (value < this.points[i].x)
        return i;
    }
    return this.points.length - 1;
  };

  setFunctions = () => {
    this.functions = [];
    for (let i = 0; i < this.points.length - 1; i++) {
      let firstPoint = this.points[i];
      let secondPoint = this.points[i + 1];
      this.functions.push(new LinealFunction(firstPoint, secondPoint));
    }
  };

  valueIsValid = value => {
    return (value >= FUNCTION_MIN
         && value <= FUNCTION_MAX);
  };

  clampValue = value => {
    if (value < FUNCTION_MIN) {
      return FUNCTION_MIN;
    }
    if (value > FUNCTION_MAX) {
      return FUNCTION_MAX;
    }
    return Math.round(value);
  }
}

export default LinealPicewiseAdjustment;