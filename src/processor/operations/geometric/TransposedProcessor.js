import ProcessImage from '../../image/ProcessImage';

class TransposedProcessor {
  static applyGeometricChange = (image) => {
    console.log(image)
    let originalImage = new ProcessImage(image.getTitle(), image.getImageData().data, image.getWidth(), image.getHeight());

    for(let i = 0; i < originalImage.getWidth()-1; i++){
      for(let j = 0; j < originalImage.getHeight()-1; j++){
        let rgbaComponent = originalImage.getRGBAComponents(i, j);
        image.setRGBAComponets(j, i, rgbaComponent.r, rgbaComponent.g, rgbaComponent.b, rgbaComponent.a)
      }
    }
  };
}

export default TransposedProcessor;
