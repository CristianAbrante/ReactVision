import ProcessImage from '../../image/ProcessImage';

class TransposedProcessor {
  static applyGeometricChange = (image) => {
    let newImageData = [];
    let index = 0;

    for(let i = 0; i < image.getHeight(); i++){
      for(let j = 0; j < image.getWidth(); j++, index += image.getHeight() * 4){
        let rgbaComponent = image.getRGBAComponents(j, i);
        newImageData[index] = rgbaComponent.r;
        newImageData[index+1] = rgbaComponent.g;
        newImageData[index+2] = rgbaComponent.b;
        newImageData[index+3] = rgbaComponent.a;
      }
       index = 4 * (i+1);
    }

    console.log(newImageData, image.getImageData())
    console.log(Uint8ClampedArray.from(newImageData))
    image.setImageData(Uint8ClampedArray.from(newImageData), image.getHeight(), image.getWidth());
  };
}

export default TransposedProcessor;
