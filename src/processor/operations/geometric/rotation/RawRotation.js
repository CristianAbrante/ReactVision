import Rotation from './Rotation';

class RawRotation extends Rotation {
  perform = (image, angle) => {
    this.createNewImageState(image, angle);
    for (let i = 0; i < image.getWidth(); i++) {
      for (let j = 0; j < image.getHeight(); j++) {
        let color = image.getBrightness(i, j);
        let position = this.getDirectPosition(angle, {x: i, y: j});
        image.setNextState();
        image.setBrightness(position.x, position.y, color);
        image.setPreviousState();
      }
    }
  }
}

export default RawRotation;