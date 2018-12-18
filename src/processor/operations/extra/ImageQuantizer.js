import ProcessImage from '../../image/ProcessImage';

class ImageQuantizer {
  static quantizeImage = (image, bits) => {
    const quantizationLevel = ProcessImage.MAX_PIXEL_VALUE / (bits+1);

    for (let row = 0; row < image.getHeight(); row++) {
      for (let col = 0; col < image.getWidth(); col++) {
        //   setColor = (x, y, component, color)
        image.setColor(col, row, 'brightness', parseInt(image.getColor(col, row, 'brightness') / quantizationLevel) * quantizationLevel);
       }
     }
  }
};

export default ImageQuantizer;
