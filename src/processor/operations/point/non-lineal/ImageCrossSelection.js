import Bresenham from 'bresenham';

class ImageCrossSelection {
  static MIN_RADIUS = 0;
  static MAX_RADIUS = 10;

  referenceImage;
  crossSelection = [];
  derivativeCrossSelection = [];
  radius = 1;

  constructor(image, radius, startPixel, endPixel) {
    this.setReferenceImage(image);
    this.setRadius(radius);
    this.setCrossSelection(startPixel, endPixel);
  }

  setRadius = radius => {
    if (ImageCrossSelection.isAValidRadius(radius)) {
      this.radius = radius;
    }
  };

  setReferenceImage = image => {
    if (image !== undefined) {
      this.referenceImage = image;
      this.crossSelection = [];
      this.derivativeCrossSelection = [];
    }
  };

  setCrossSelection = (startPixel, endPixel) => {
    if (this.referenceImage === undefined) {
      throw new Error('reference image is undefined.');
    }
    if (!this.pixelIsInRange(startPixel)) {
      throw new Error('pixel {' + startPixel.x + ', ' + startPixel.y + '} is not in range.');
    }
    if (!this.pixelIsInRange(endPixel)) {
      throw new Error('pixel {' + endPixel.x + ', ' + endPixel.y + '} is not in range.');
    }

    let crossSelectionPixels = Bresenham(startPixel.x, startPixel.y, endPixel.x, endPixel.y);
    this.crossSelection = [];
    this.derivativeCrossSelection = [];
    for (let i = 0; i < crossSelectionPixels.length; i++) {
      let pixel = crossSelectionPixels[i];
      let pixelColor = this.getColor(pixel);
      let derivativeColor = this.getDerivativeColor(crossSelectionPixels, i);
      this.addData(this.crossSelection, pixel, pixelColor);
      this.addData(this.derivativeCrossSelection, pixel, derivativeColor);
    }
  };

  getFormattedCrossSelection = () => {
    return this.getFormattedData(this.crossSelection);
  };

  getFormattedDerivativeSelection = () => {
    return this.getFormattedData(this.derivativeCrossSelection);
  };

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

  getDerivativeColor = (crossSelectionPixels, index) => {
    if (index >= 0 && index < crossSelectionPixels.length) {
      let currentPixel = crossSelectionPixels[index];
      if (index === crossSelectionPixels.length - 1)
        return currentPixel;

      let nextPixel = crossSelectionPixels[index + 1];
      let currentColor = this.getColor(currentPixel);
      let nextColor = this.getColor(nextPixel);
      return nextColor - currentColor;
    }
  };

  addData = (list, pixel, color) => {
    list.push(
        {
          x: pixel.x,
          y: pixel.y,
          color: color,
        }
    );
  };

  getFormattedData = pixels => {
    let formattedData = [];
    let pointCount = 0;
    for (let i = 0; i < pixels.length; i++) {
      let pixel = pixels[i];
      formattedData.push(
          {
            x: pointCount,
            y: pixel.color,
          }
      );
      pointCount += 1;
    }
    return formattedData;
  };

  pixelIsInRange = (pixel) => {
    return pixel.x >= 0 && pixel.x < this.referenceImage.getWidth()
        && pixel.y >= 0 && pixel.y < this.referenceImage.getHeight();
  };

  getNormalizedColor = (i, j) => {
    try {
      return this.referenceImage.getBrightness(i, j);
    }
    catch(e) {
      return undefined;
    }
  };

  static isAValidRadius(radius) {
    return radius >= this.MIN_RADIUS && radius <= this.MAX_RADIUS;
  };
}

export default ImageCrossSelection;