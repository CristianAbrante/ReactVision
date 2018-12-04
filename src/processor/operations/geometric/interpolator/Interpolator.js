

class Interpolator {
  static OVER_LIMITS_COLOR = 0;

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
    if (this.isInBounds(image, x, y)) {
      color = image.getBrightness(x, y);
    } else {
      color = Interpolator.OVER_LIMITS_COLOR;
    }
    return {
      x: x,
      y: y,
      color: color,
    };
  };

  isInBounds(image, x, y) {
    return x >= 0 && x < image.getWidth()
        && y >= 0 && y < image.getHeight();
  };
}

export default Interpolator;