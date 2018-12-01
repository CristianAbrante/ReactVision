

class Interpolator {
  neighbourhoodRaidus = 1;

  getNeighbourhood = (image, position) => {
    let upX = Math.ceil(position.x);
    let bottomX = Math.floor(position.x);
    let upY = Math.ceil(position.y);
    let bottomY = Math.floor(position.y);
    let neighbour1 = this.getNeighbour(image, upX, upY);
    let neighbour2 = this.getNeighbour(image, upX, bottomY);
    let neighbour3 = this.getNeighbour(image, bottomX, upY);
    let neighbour4 = this.getNeighbour(image, bottomX, bottomY);

    let neighbourhood = [];
    if (neighbour1 !== undefined)
      neighbourhood.push(neighbour1);
    if (neighbour2 !== undefined)
      neighbourhood.push(neighbour2);
    if (neighbour3 !== undefined)
      neighbourhood.push(neighbour3);
    if (neighbour4 !== undefined)
      neighbourhood.push(neighbour4);

    return neighbourhood;
  };

  getNeighbour = (image, x, y) => {
    try {
      let color = image.getBrightness(x, y);
      return {
        x: x,
        y: y,
        color: color,
      }
    }
    catch (e) {
      return undefined;
    }
  };
}

export default Interpolator;