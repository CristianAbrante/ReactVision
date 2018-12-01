
const FACTOR_MIN = 0.0;
const FACTOR_MAX = 3.0;

class Scaling {
  verticalFactor;
  horizontalFactor;

  Scaling(verticalFactor, horizontalFactor) {

  }

  perform = image => {
    let newWidth = Math.round(this.horizontalFactor * image.getWidth());
    let newHeight = Math.round(this.verticalFactor * image.getHeight());
    image.createNewBlankState(newWidth, newHeight);
    image.setNextState();
  };

  setVerticalFactorFromWidth = (oldWidth, newWidth) => {
    this.setVerticalFactor(newWidth / oldWidth);
  };

  setHoorizontalFactorFromHeight = (oldHeight, newHeight) => {
    this.setHorizontalFactor(newHeight / oldHeight);
  };

  setFactor = factor => {
    this.setVerticalFactor(factor);
    this.setHorizontalFactor(factor);
  };

  setVerticalFactor = verticalFactor => {
    if (this.factorIsValid(verticalFactor))
      this.verticalFactor = verticalFactor;
  };

  setHorizontalFactor = horizontalFactor => {
    if (this.factorIsValid(horizontalFactor))
      this.horizontalFactor = horizontalFactor;
  };

  factorIsValid = (factor) => {
    return factor !== undefined
        && factor > FACTOR_MIN
        && factor <= FACTOR_MAX;
  };
}

export default Scaling;