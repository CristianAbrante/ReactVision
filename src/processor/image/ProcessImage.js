
class ProcessImage {
  title;
  data;
  width;
  height;

  constructor(title, data, width, height) {
    this.title = title.replace(/\..+/i, "");
    this.width = width;
    this.height = height;
    this.setImageData(data);
  }

  setImageData = data => {
    this.data = new ImageData(new Uint8ClampedArray(data), this.width, this.height);
  };

  getImageData = () => {
    return this.data;
  };

  getTitle = () => {
    return this.title;
  };

  indexesAreInRange(i, j) {
    return (i >= 0 && i < this.width)
        && (j >= 0 && j < this.height);
  }

  colorIsInRange(color) {
    return (color >= 0 && color <= 255);
  }

  /**
   * Returns the color index in
   * the data array.
   *
   * @param i column of the pixel
   * @param j row of the pixel.
   * @returns {*} start index of the pixel.
   */
  getColorIndex(i, j) {
    if (this.indexesAreInRange(i, j)) {
      return j * (this.width * 4) + i * 4;
    } else {
      return undefined;
    }
  }

  getColor(i, j, component) {
    const index = this.getColorIndex(i, j) + component;
    if (index !== undefined) {
      return this.data.data[index];
    } else {
      throw new Error('indexes are not in range');
    }
  }

  setColor(i, j, component, color) {
    if (this.colorIsInRange(color)) {
      const index = this.getColorIndex(i, j) + component;
      if (index !== undefined) {
        this.data.data[index] = color;
      } else {
        throw new Error('indexes are not in range');
      }
    } else {
      throw new Error('color is not in range: ' + color);
    }
  }

  getRedComponent(i, j) {
    return this.getColor(i, j, 0);
  }

  setRedComponent(i, j, red) {
    this.setColor(i, j, 0, red);
  }

  getGreenComponent(i, j) {
    return this.getColor(i, j, 1);
  }

  setGreenComponent(i, j, green) {
    this.setColor(i, j, 1, green);
  }

  getBlueComponent(i, j) {
    return this.getColor(i, j, 2);
  }

  setBlueComponent(i, j, blue) {
    this.setColor(i, j, 2, blue);
  }

  getAlphaComponent(i, j) {
    return this.getColor(i, j, 3);
  }

  setAlphaComponent(i, j, alpha) {
    this.setColor(i, j, 3, alpha);
  }

  /**
   * Performs NTSC conversion
   * of the components to calculate
   * brightness.
   *
   * @param i
   * @param j
   * @returns {number}
   */
  getBrightness(i, j) {
    let r = this.getRedComponent(i, j);
    let g = this.getGreenComponent(i, j);
    let b = this.getBlueComponent(i, j);
    return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  }

  getRGBComponents(i, j) {
    return [
      this.getRedComponent(i, j),
      this.getGreenComponent(i, j),
      this.getBlueComponent(i, j)
    ]
  }

  setRGBComponents(i, j, red, green, blue) {
    this.setRedComponent(i, j, red);
    this.setGreenComponent(i, j, green);
    this.setBlueComponent(i, j, blue);
  }

  getRGBAComponents(i, j) {
    return this.getRGBComponents(i, j)
        + [this.getAlphaComponent(i, j)];
  }

  setRGBAComponets(i, j, red, green, blue, alpha) {
    this.setRGBComponents(i, j, red, green, blue);
    this.setAlphaComponent(i, j, alpha);
  }
}

export default ProcessImage;
