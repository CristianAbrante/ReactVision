
class Scaling {
  verticalFactor;
  horizontalFactor;
  static FACTOR_MIN = 0.0;
  static FACTOR_MAX = 3.0;

  constructor(verticalFactor, horizontalFactor) {
    this.setVerticalFactor(verticalFactor);
    this.setHorizontalFactor(horizontalFactor);
  }

  perform = (image, interpolator) => {
    let newWidth = Math.round(this.horizontalFactor * image.getWidth());
    let newHeight = Math.round(this.verticalFactor * image.getHeight());
    image.createNewBlankState(newWidth, newHeight);
    image.setNextState();
    console.log(image);
    console.log(this.horizontalFactor);
    console.log(this.verticalFactor);
    console.log(newWidth);
    console.log(newHeight);
    console.log(image);
    /*
    for (let i = 0; i < image.getWidth(); i++) {
      for (let j = 0; j < image.getHeight(); j++) {
        let position = {
          x: i / this.verticalFactor,
          y: j / this.horizontalFactor,
        };

        image.setPreviousState();
        let interpolatedColor = interpolator.interpolateColor(image, position);
        image.setNextState();
        image.setBrightness(i, j, interpolatedColor);
      }
    }*/
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