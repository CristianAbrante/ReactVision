
import Interpolator from './Interpolator';

class NearestNeighbourInterpolator extends Interpolator {
  interpolateColor = (image, position) => {
    let neighbourhood = this.getNeighbourhood(image, position);
    let xBound = Math.round(position.x);
    if (xBound >= image.getWidth()) {
      xBound -= 1;
    }
    let yBound = Math.round(position.y);
    if (yBound >= image.getHeight()) {
      yBound -= 1;
    }
    let neighbourIndex = 0;
    neighbourhood.map((neighbour,index) => {
      if (neighbour.x === xBound && neighbour.y === yBound) {
        neighbourIndex = index;
      }
    });
    return neighbourhood[neighbourIndex].color;
  }
}

export default NearestNeighbourInterpolator;