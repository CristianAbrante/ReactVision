import ImageDifference from './ImageDifference';

class ChangesDetection {
  threshold;
  resultImage;

  constructor(threshold) {
    this.threshold = threshold;
  }

  perform = (image1, image2) => {
    let difference = new ImageDifference();
    difference.perform(image1, image2);
    this.resultImage = difference.resultImage;

    for (let i = 0; i < this.resultImage.getWidth(); i++) {
      for (let j = 0; j < this.resultImage.getHeight(); j++) {
        let color = this.resultImage.getBrightness(i, j);
        if (color > this.threshold) {
          this.resultImage.setRGBComponents(i, j, 255, 0, 0);
        }
      }
    }
  };
}

export default ChangesDetection;