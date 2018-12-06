
class Rotation {
  static MIN_ANGLE = -360.0;
  static MAX_ANGLE = 360.0;

  createNewImageState = (image, angle) => {
    let size = this.getNewImageWidthAndHeight(image, angle);
    image.createNewBlankState(size.width, size.height);
  };

  getImageCorners = (image) => {
    let maxWidth = image.getWidth() - 1;
    let maxHeight = image.getHeight() - 1;
    return {
      topLeft:     {x: 0, y: 0},
      topRight:    {x: maxWidth, y: 0},
      bottomLeft:  {x: 0, y: maxHeight},
      bottomRight: {x: maxWidth, y: maxHeight}
    }
  };

  getRotatedImageCorners = (image, angle) => {
    let corners = this.getImageCorners(image);
    let rotatedCorners = {};
    let keys = Object.keys(corners);
    for (let k = 0; k < keys.length; k++) {
      let key = keys[k];
      rotatedCorners[key] = this.getRotationPosition(angle, corners[key]);
    }
    return rotatedCorners;
  };

  getNewImageWidthAndHeight = (image, angle) => {
    let corners = this.getRotatedImageCorners(image, angle);
    let minMax = this.getMinMaxCorners(corners);
    return {
      width: Math.round(Math.abs(minMax.max.x - minMax.min.x)),
      height: Math.round(Math.abs(minMax.max.y - minMax.min.y)),
    };
  };

  getMinMaxCorners = (corners) => {
    let xCoordinates = [];
    let yCoordinates = [];
    let keys = Object.keys(corners);
    for (let k = 0; k < keys.length; k++) {
      let key = keys[k];
      xCoordinates.push(corners[key].x);
      yCoordinates.push(corners[key].y);
    }
    return {
      min: {
        x: Math.min(...xCoordinates),
        y: Math.min(...yCoordinates),
      },
      max: {
        x: Math.max(...xCoordinates),
        y: Math.max(...yCoordinates),
      }
    }
  };

  getRotationPosition = (angle, position) => {
    const {x, y} = position;
    let radAngle = angle * Math.PI / 180;
    return {
      x: x * Math.cos(radAngle) + y * Math.sin(radAngle),
      y: - x * Math.sin(radAngle) + y * Math.cos(radAngle),
    }
  };

  getDirectPosition = (angle, position, minMax) => {
    let {x, y} = this.getRotationPosition(angle, position);
    return {
      x: x + Math.abs(minMax.min.x),
      y: y + Math.abs(minMax.min.y),
    };
  };

  getInversePosition = (angle, position, minMax) => {
    let {x, y} = position;
    let minX = minMax.min.x;
    let minY = minMax.min.y;
    let radAngle = angle * Math.PI / 180;
    return {
      x: (x - minX) * Math.cos(radAngle) + (minY - y) * Math.sin(radAngle),
      y: (x - minX) * Math.sin(radAngle) + (y - minY) * Math.cos(radAngle),
    }
  };

  static angleIsValid(angle) {
    return angle >= Rotation.MIN_ANGLE
        && angle <= Rotation.MAX_ANGLE;
  }

  clampIndexes = (image, position) => {
    let keys = Object.keys(position);
    for (let k = 0; k < keys.length; k++) {
      let key = keys[k];
      position[key] = Math.round(position[key]);
      if (position[key] < 0) {
        position[key] = 0;
      }
    }
    if (position.x >= image.getWidth()) {
      position.x = image.getWidth() - 1;
    }
    if (position.y >= image.getHeight()) {
      position.y = image.getHeight() - 1;
    }
  }
}

export default Rotation;