import ProcessImage from '../../../image/ProcessImage';

const FUNCTION_MIN = ProcessImage.MIN_PIXEL_VALUE;
const FUNCTION_MAX = ProcessImage.MAX_PIXEL_VALUE - 1;

class GammaCorrection {
  gamma;
  static GAMMA_MIN = 0.0;
  static GAMMA_MAX = 20.0;

  constructor(gamma) {
    this.setGamma(gamma);
  }

  setGamma = gamma => {
    if (gamma > GammaCorrection.GAMMA_MIN
        && gamma <= GammaCorrection.GAMMA_MAX) {
      this.gamma = gamma;
    }
  };

  perform = level => {
    if (!this.valueIsValid(level)) {
      throw new Error('level is not valid: ' + level);
    }
    let value = FUNCTION_MAX * Math.pow(level / FUNCTION_MAX, this.gamma);
    return this.clampValue(value);
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

export default GammaCorrection;