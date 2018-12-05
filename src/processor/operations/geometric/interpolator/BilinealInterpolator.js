import Interpolator from './Interpolator';
import ProcessImage from '../../../image/ProcessImage';

class BilinealInterpolator extends Interpolator {
  interpolateColor = (image, position) => {
    let neighbourhood = this.getNeighbourhood(image, position);
    let X = Math.floor(position.x);
    let Y = Math.floor(position.y);
    let p = X - position.x;
    let q = Y - position.y;
    let A = neighbourhood.A.color;
    let B = neighbourhood.B.color;
    let C = neighbourhood.C.color;
    let D = neighbourhood.D.color;
    let P = (A + D - B - C) * p * q
          + (A - C) * q
          + (A - B) * p
          + A;
    return this.clampResult(P);
  };

  clampResult = value => {
    let result = Math.floor(value);
    if (result < ProcessImage.MIN_PIXEL_VALUE) {
      result = ProcessImage.MIN_PIXEL_VALUE;
    }
    if (result >= ProcessImage.MAX_PIXEL_VALUE) {
      result = ProcessImage.MAX_PIXEL_VALUE - 1;
    }
    return result;
  }
}

export default BilinealInterpolator;