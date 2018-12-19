import ProcessImage from '../../../image/ProcessImage';

class ImageQuantizer {
  static quantizeImage = (image, bits) => {
    let numberOfLevels = Math.pow(2, bits) - 1;

    for (let row = 0; row < image.getHeight(); row++) {
      for (let col = 0; col < image.getWidth(); col++) {
        let color = image.getBrightness(col, row);
        let newScaleColor = Math.round((numberOfLevels * color) / (ProcessImage.MAX_PIXEL_VALUE - 1));
        let originalScaleColor = Math.floor((newScaleColor * (ProcessImage.MAX_PIXEL_VALUE - 1)) / numberOfLevels);
        image.setBrightness(col, row, originalScaleColor);
       }
     }
  }
};

export default ImageQuantizer;
