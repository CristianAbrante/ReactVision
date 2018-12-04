

class Interpolator {
  static OVER_LIMITS_COLOR = -1;

  getNeighbourhood = (image, position) => {
    let neighbourhood = {};
    let keys = ['A', 'B', 'C', 'D'];
    let keyIndex = 0;
    let X = Math.floor(position.x);
    let Y = Math.floor(position.y);
    for (let i = X; i <= X + 1; i++) {
      for (let j = Y; j <= Y + 1; j++) {
        let neighbour = this.getNeighbour(image, i,  j);
        let key = keys[keyIndex];
        neighbourhood[key] = neighbour;
        keyIndex += 1;
      }
    }
    return neighbourhood;
  };

  getNeighbour = (image, x, y) => {
    let color;
    try {
      color = image.getBrightness(x, y);
    }
    catch (e) {
      color = Interpolator.OVER_LIMITS_COLOR;
    }
    return {
      x: x,
      y: y,
      color: color,
    };
  };
}

export default Interpolator;