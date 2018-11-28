import ProcessImage from '../../image/ProcessImage';

class VerticalTransformProcessor {

  static applyGeometricChange = (image) => {
    let originalImage = new ProcessImage(image.getTitle(), image.getWidth(), image.getHeight(), image.getImageData().data);

    for(let i = 0; i < originalImage.getHeight()-1; i++){
      for(let j = 0; j < originalImage.getWidth()-1; j++){
        let rgbaComponent = originalImage.getRGBAComponents(j, i);
        image.setRGBAComponets(j, (originalImage.getHeight()-1)-i, rgbaComponent.r, rgbaComponent.g, rgbaComponent.b, rgbaComponent.a)
      }
    }
  };
}

export default VerticalTransformProcessor;
