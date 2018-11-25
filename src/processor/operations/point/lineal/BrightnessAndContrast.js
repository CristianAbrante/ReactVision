import ProcessImage from '../../../image/ProcessImage';

class BrightnessAndContrast {
  newMean;
  newStdVar;
  oldMean;
  oldStdVar;

  constructor(oldMean, oldStdVar, newMean, newStdVar) {
    this.setOldMean(oldMean);
    this.setNewMean(newMean);
    this.setOldStdVar(newMean);
    this.setNewStdVar(newStdVar);
  }

  setOldMean = oldMean => {
    if (this.valueIsValid(oldMean))
      this.oldMean = oldMean;
  };

  setOldStdVar = oldStdVar => {
    if (this.valueIsValid(oldStdVar))
      this.oldStdVar = oldStdVar;
  };

  setNewMean = newMean => {
    if (this.valueIsValid(newMean)) {
      this.newMean = newMean;
    }
  };

  setNewStdVar = newStdVar => {
    if (this.valueIsValid(newStdVar))
      this.newStdVar = newStdVar;
  };

  perform = level => {
    if (level !== undefined) {
      let value = Math.round((this.newStdVar / this.oldStdVar) * (level - this.oldMean) + this.newMean);
      return this.clampValue(value);
    } else  {
      return undefined;
    }
  };

  valueIsValid = value => {
    return (value >= ProcessImage.MIN_PIXEL_VALUE
         && value < ProcessImage.MAX_PIXEL_VALUE);
  };

  clampValue = value => {
    if (value < ProcessImage.MIN_PIXEL_VALUE) {
      return ProcessImage.MIN_PIXEL_VALUE;
    }
    if (value >= ProcessImage.MAX_PIXEL_VALUE) {
      return ProcessImage.MAX_PIXEL_VALUE - 1;
    }
    return value;
  }
}

export default BrightnessAndContrast;