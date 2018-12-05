
class Rotation {
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
      rotatedCorners[key] = this.getDirectPosition(angle, corners[key]);
    }
    return rotatedCorners;
  };

  getNewImageWidthAndHeight = (image, angle) => {
    let corners = this.getRotatedImageCorners(image, angle);
    let minMax = this.getMinMaxCorners(corners);
    return {
      width: Math.abs(minMax.max.x - minMax.min.x),
      height: Math.abs(minMax.max.y - minMax.min.y),
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

  getDirectPosition = (angle, position) => {
    const {x, y} = position;
    let radAngle = angle * Math.PI / 180;
    return {
      x: Math.round(x * Math.cos(radAngle) - y * Math.sin(radAngle)),
      y: Math.round(x * Math.sin(radAngle) + y * Math.cos(radAngle)),
    }
  };

  getInversePosition = (angle, position) => {
    return this.getDirectPosition(- angle, position);
  };
}

export default Rotation;