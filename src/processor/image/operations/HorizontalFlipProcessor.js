import ProcessImage from '../ProcessImage';

class HorizontalTransformProcessor {

  static getGeometricChange = (image) => {
    let originalImage = new ProcessImage(image.getTitle(), image.getImageData().data, image.getWidth(), image.getHeight());

    for(let i = 0; i < originalImage.getHeight()-1; i++){
      for(let j = 0; j < originalImage.getWidth()-1; j++){
        let rgbaComponent = originalImage.getRGBAComponents(j, i);
        image.setRGBAComponets((originalImage.getWidth()-1)-j, i, rgbaComponent.r, rgbaComponent.g, rgbaComponent.b, rgbaComponent.a)
      }
    }
  };
}

export default HorizontalTransformProcessor;
