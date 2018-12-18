import ImageCrossSelection from './ImageCrossSelection';

class SmoothImageCrossSection extends ImageCrossSelection {
  static MIN_RADIUS = 0;
  static MAX_RADIUS = 10;
  radius = 1;

  setRaidus = radius => {
    if (SmoothImageCrossSection.isValid(radius)) {
      this.radius = radius;
    }
  };

  static isValid(radius) {
    return radius >= this.MIN_RADIUS && radius <= this.MAX_RADIUS;
  }

  getColor = pixel => {
    let sumColor = 0;
    let numberOfNeighbours = 0;
    for (let i = pixel.x - this.radius; i <= pixel.x + this.radius; i++) {
      for (let j = pixel.y - this.radius; j <= pixel.y + this.radius; j++) {
        let color = this.getNormalizedColor(i, j);
        if (color !== undefined) {
          sumColor += color;
          numberOfNeighbours += 1;
        }
      }
    }
    return sumColor / numberOfNeighbours;
  };

  getNormalizedColor = (i, j) => {
    try {
      let color = this.referenceImage.getBrightness(i, j);
      return color;
    }
    catch(e) {
      return undefined;
    }
  }
}