
class Scaling {
  verticalFactor;
  horizontalFactor;
  static FACTOR_MIN = 1.0;
  static FACTOR_MAX = 4.0;

  constructor(horizontalFactor, verticalFactor) {
    this.setVerticalFactor(verticalFactor);
    this.setHorizontalFactor(horizontalFactor);
  }

  perform = (image, interpolator) => {
    let newWidth = Math.round(this.horizontalFactor * image.getWidth());
    let newHeight = Math.round(this.verticalFactor * image.getHeight());
    image.createNewBlankState(newWidth, newHeight);
    image.setNextState();
    for (let i = 0; i < image.getWidth(); i++) {
      for (let j = 0; j < image.getHeight(); j++) {
        let position = {
          x: i / this.horizontalFactor,
          y: j / this.verticalFactor,
        };
        image.setPreviousState();
        let interpolatedColor = interpolator.interpolateColor(image, position);
        image.setNextState();
        image.setBrightness(i, j, interpolatedColor);
        image.setAlphaComponent(i, j, 255);
      }
    }
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
    if (Scaling.factorIsValid(verticalFactor))
      this.verticalFactor = verticalFactor;
  };

  setHorizontalFactor = horizontalFactor => {
    if (Scaling.factorIsValid(horizontalFactor))
      this.horizontalFactor = horizontalFactor;
  };

  static factorIsValid = (factor) => {
    return factor !== undefined
        && factor > Scaling.FACTOR_MIN
        && factor <= Scaling.FACTOR_MAX;
  };
}

export default Scaling;