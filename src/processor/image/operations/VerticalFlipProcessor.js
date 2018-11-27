import ProcessImage from '../ProcessImage';

class VerticalTransformProcessor {

  static getGeometricChange = (image) => {
    let originalImage = new ProcessImage(image.getTitle(), image.getImageData().data, image.getWidth(), image.getHeight());

    for(let i = 0; i < originalImage.getHeight()-1; i++){
      for(let j = 0; j < originalImage.getWidth()-1; j++){
        let rgbaComponent = originalImage.getRGBAComponents(j, i);
        image.setRGBAComponets(j, (originalImage.getHeight()-1)-i, rgbaComponent.r, rgbaComponent.g, rgbaComponent.b, rgbaComponent.a)
      }
    }
  };
}

export default VerticalTransformProcessor;
