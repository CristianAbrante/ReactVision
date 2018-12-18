import Bresenham from 'bresenham';

class ImageCrossSelection {
  referenceImage;
  crossSelection = [];
  derivativeCrossSelection = [];

  constructor(image, startPixel, endPixel) {
    this.setReferenceImage(image);
    this.setCrossSelection(startPixel, endPixel);
  }

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
    return this.referenceImage.getBrightness(pixel.x, pixel.y);
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
}

export default ImageCrossSelection;