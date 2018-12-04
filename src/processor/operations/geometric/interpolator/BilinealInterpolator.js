import Interpolator from './Interpolator';

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

    /*
    console.log(X);
    console.log(Y);
    console.log(p);
    console.log(q);
    console.log(A);
    console.log(B);
    console.log(C);
    console.log(D);
    */
    return (B + C - A - D) * p * q
         + (C - A) * q
         + (C - D) * p
         + C;
  };
}

export default BilinealInterpolator;