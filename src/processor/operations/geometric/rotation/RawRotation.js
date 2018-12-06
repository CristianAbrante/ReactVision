import Rotation from './Rotation';

class RawRotation extends Rotation {
  perform = (image, angle) => {
    let corners = this.getRotatedImageCorners(image, angle);
    let minMax = this.getMinMaxCorners(corners);
    this.createNewImageState(image, angle);
    for (let i = 0; i < image.getWidth(); i++) {
      for (let j = 0; j < image.getHeight(); j++) {
        let color = image.getBrightness(i, j);
        let position = this.getDirectPosition(angle, {x: i, y: j}, minMax);
        image.setNextState();
        this.clampIndexes(image, position);
        image.setBrightness(position.x, position.y, color);
        image.setAlphaComponent(position.x, position.y, 255);
        image.setPreviousState();
      }
    }
  };
}

export default RawRotation;