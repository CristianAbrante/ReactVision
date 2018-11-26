import ProcessImage from '../../../image/ProcessImage';

const FUNCTION_MIN = ProcessImage.MIN_PIXEL_VALUE;
const FUNCTION_MAX = ProcessImage.MAX_PIXEL_VALUE - 1;

class HistogramEqualization {
  histogram;
  k;

  constructor(histogram) {
    this.histogram = histogram;
    this.k = this.histogram.getNumberOfPixels() / FUNCTION_MAX;
  }

  perform = level => {
    return this.clampValue(Math.round(this.histogram.getAccumulativeCount(level).brightness / this.k) - 1);
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

export default HistogramEqualization;