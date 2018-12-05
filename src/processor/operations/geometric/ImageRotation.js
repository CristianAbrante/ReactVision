import ProcessImage from '../../image/ProcessImage';

class ImageRotation {
  static applyGeometricChange = (image, degrees) => {
    let times = degrees / 360 * 4 - parseInt(degrees / 360, 10) * 4;

    console.log(times)
    let newImage = new ProcessImage(image.getTitle(), image.getWidth(), image.getHeight(), image.getImageData().data);
    let newImageData = [];

    for(; times > 0; times--){
      for(let i = newImage.getWidth(); i > 0; i--){
        for(let j = 0; j < newImage.getHeight(); j++){
          let rgbaComponent = newImage.getRGBAComponents(i, j);
          newImageData.push(rgbaComponent.r)
          newImageData.push(rgbaComponent.g)
          newImageData.push(rgbaComponent.b)
          newImageData.push(rgbaComponent.a)
        }
      }
      newImage.setNewState(Uint8ClampedArray.from(newImageData), newImage.getHeight(), newImage.getWidth());
      newImage.setNextState();
      newImageData = [];
    }

    image.setNewState(Uint8ClampedArray.from(newImage.getImageData().data), newImage.getWidth(), newImage.getHeight());
    image.setNextState();

  };
}

export default ImageRotation;
