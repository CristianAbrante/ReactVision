import ProcessImage from '../../../image/ProcessImage';

const FUNCTION_MIN = ProcessImage.MIN_PIXEL_VALUE;
const FUNCTION_MAX = ProcessImage.MAX_PIXEL_VALUE - 1;

class HistogramSpecification {
  toTransformHistogram;
  referenceHistogram;

  constructor(toTransformHistogram, referenceHistogram) {
    this.toTransformHistogram = toTransformHistogram;
    this.referenceHistogram = referenceHistogram;
  }

  perform = level => {
    if (!this.valueIsValid(level))
      throw new Error('invalid level: ' + level);

    let originalValue = this.toTransformHistogram.getAccumulativeProbability(level).brightness;
    let outputLevel = 0;
    while (outputLevel <= FUNCTION_MAX) {
      let referenceValue =
          this.referenceHistogram.getAccumulativeProbability(outputLevel).brightness;
      if (referenceValue >= originalValue)
        return outputLevel;
      outputLevel += 1;
    }
  };

  valueIsValid = value => {
    return (value >= FUNCTION_MIN
        && value <= FUNCTION_MAX);
  };
}

export default HistogramSpecification;