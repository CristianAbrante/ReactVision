import Rotation from './Rotation';

class InterpolatedRotation extends Rotation {
  perform = (image, angle, interpolator) => {
    let corners = this.getRotatedImageCorners(image, angle);
    let minMax = this.getMinMaxCorners(corners);
    this.createNewImageState(image, angle);
    image.setNextState();
    for (let i = 0; i < image.getWidth(); i++) {
      for (let j = 0; j < image.getHeight(); j++) {
        let position = this.getInversePosition(angle, {x: i, y: j}, minMax);
        image.setPreviousState();
        if (this.positionIsValid(position, image)) {
          let color = interpolator.interpolateColor(image, position);
          image.setNextState();
          image.setBrightness(i, j, color);
          image.setAlphaComponent(i, j, 255);
        }
        image.setNextState();
      }
    }
  };

  positionIsValid = (position, image) => {
    return position.x >= 0 && position.x < image.getWidth()
        && position.y >= 0 && position.y < image.getHeight();
  }
}

export default InterpolatedRotation;