
import Interpolator from './Interpolator';

class NearestNeighbourInterpolator extends Interpolator {
  interpolateColor = (image, position) => {
    let xBound = Math.round(position.x);
    let yBound = Math.round(position.y);
    let neighbourhood = this.getNeighbourhood(image, position);
    let neighbourIndex = 0;
    neighbourhood.map((neighbour,index) => {
      if (neighbour.x === xBound && neighbour.y === yBound) {
        neighbourIndex = index;
      }
    });

    return neighbourhood[neighbourIndex];
  }
}

export default NearestNeighbourInterpolator;