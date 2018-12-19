import ProcessImage from '../../../image/ProcessImage';

class ImageResampler {
  static MAX_VALUE = 5
  static MIN_VALUE = 1;

  static resample = (image, rows, cols) => {
    let prevY = 0;

    for(let y = 0; y < image.getHeight(); y++) {
      for(let x = 0; x < image.getWidth(); x++) {

        if(x % rows == 0 && y % cols == 0) {
          let prevValues = [];

          for(let i = x; i < x + rows; i++) {
            for(let j = y; j < y + cols; j++){
              if(i < image.getWidth() && j < image.getHeight()){
                let rgbcolor = image.getRGBAComponents(i, j);
                prevValues.push({i, j, rgbcolor});
              }
            }
          }
          let meansColors = {r: 0, g: 0, b:0, a:0};

          for(let k = 0; k < prevValues.length; k++){
           meansColors.r += prevValues[k].rgbcolor.r;
           meansColors.g += prevValues[k].rgbcolor.g;
           meansColors.b += prevValues[k].rgbcolor.b;
           meansColors.a += prevValues[k].rgbcolor.a;
         }

         meansColors = Object.values(meansColors).map(
           (value) => { return value / (rows * cols) }
         );

         for(let k = 0; k < prevValues.length; k++)
            image.setRGBAComponets(prevValues[k].i, prevValues[k].j, meansColors[0], meansColors[1], meansColors[2], meansColors[3])
        }
      }

    }
  }
};

export default ImageResampler;
