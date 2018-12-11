import ProcessImage from '../../image/ProcessImage';

class ImageRotation {
  static applyGeometricChange = (image, degrees) => {
    let times = degrees / 360 * 4 - parseInt(degrees / 360, 10) * 4;
    let newImage = new ProcessImage(image.getTitle(), image.getWidth(), image.getHeight(), image.getImageData().data);
    let newImageData = [];

    for(; times > 0; times--){
      for(let i = newImage.getWidth()-1; i >= 0; i--){
        for(let j = 0; j < newImage.getHeight(); j++){
          let rgbaComponent = newImage.getRGBAComponents(i, j);
          newImageData.push(rgbaComponent.r)
          newImageData.push(rgbaComponent.g)
          newImageData.push(rgbaComponent.b)
          newImageData.push(rgbaComponent.a)
        }
      }
      newImage = ImageRotation.newImage(newImage, newImageData);
      newImageData = [];
    }

    image.setNewState(Uint8ClampedArray.from(newImage.getImageData().data), newImage.getWidth(), newImage.getHeight());
    image.setNextState();
  };

  static newImage = (newImage, newImageData) => {
      return new ProcessImage(newImage.getTitle(), newImage.getHeight(), newImage.getWidth(), Uint8ClampedArray.from(newImageData));
  };
}
export default ImageRotation;
