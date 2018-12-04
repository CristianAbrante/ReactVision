
import Interpolator from './Interpolator';

class NearestNeighbourInterpolator extends Interpolator {
  interpolateColor = (image, position) => {
    let bound = this.getPositionBound(image, position);
    let neighbourhood = this.getNeighbourhood(image, position);
    let keys = Object.keys(neighbourhood);
    let nearestNeighbourKey;
    for (let k = 0; k < keys.length; k++) {
      let neighbour = neighbourhood[keys[k]];
      if (neighbour.x === bound.x
          && neighbour.y === bound.y) {
        nearestNeighbourKey = keys[k];
      }
    }
    return neighbourhood[nearestNeighbourKey].color;
  };

  getPositionBound = (image, position) => {
    let x = Math.round(position.x);
    let y = Math.round(position.y);
    return {
      x: x < image.getWidth() ? x : x - 1,
      y: y < image.getHeight() ? y : y - 1,
    };
  }
}

export default NearestNeighbourInterpolator;