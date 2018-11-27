import ProcessImage from '../../../image/ProcessImage';

class ImageDifference {
  resultImage;

  perform = (image1, image2) => {
      if (!this.imagesHaveTheSameSize(image1, image2))
        throw new Error('images do not have the same size');

      let width = image1.getWidth();
      let height = image1.getHeight();
      this.resultImage =
          new ProcessImage('difference.png',width, height);
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          let color1 = image1.getBrightness(i, j);
          let color2 = image2.getBrightness(i, j);
          let difference = Math.abs(color1 - color2);
          this.resultImage.setBrightness(i, j, difference);
          this.resultImage.setAlphaComponent(i, j, 255);
        }
      }
  };

  imagesHaveTheSameSize = (image1, image2) => {
    return (image1.getWidth() === image2.getWidth()
         && image1.getHeight() === image2.getHeight());
  };
}

export default ImageDifference;