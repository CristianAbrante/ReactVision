

class Interpolator {
  static OVER_LIMITS_COLOR = 0;

  getNeighbourhood = (image, position) => {
    let X = Math.floor(position.x);
    let Y = Math.floor(position.y);
    return {
      A: this.getNeighbour(image, X, Y),
      B: this.getNeighbour(image, X + 1, Y),
      C: this.getNeighbour(image, X, Y + 1),
      D: this.getNeighbour(image, X + 1, Y + 1),
    };
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