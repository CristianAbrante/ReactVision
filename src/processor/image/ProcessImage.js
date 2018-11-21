/**
 * Process image class represents
 * an image fully editable. It contains
 * the pixel values for each position
 * of the image.
 *
 * Uses R,G,B,A representation
 * of each pixel.
 */
class ProcessImage {
  static MIN_PIXEL_VALUE = 0;
  static MAX_PIXEL_VALUE = 255;
  static colorComponent = {
    r: 0,
    g: 1,
    b: 2,
    a: 3,
  };

  title;
  format;
  data;

  /**
   * Constructor of the class
   * takes the title, data and
   * width and height of the
   * image.
   *
   * @param title of the image containing format.
   * @param data of the pixels.
   * @param width of the image.
   * @param height of the image.
   */
  constructor(title, data, width, height) {
    this.title = title.replace(/\..+/i, "");
    this.format = title.split('.').pop();
    this.setImageData(data, width, height);
  }

  getTitle = () => {
    return this.title;
  };

  getFormat = () => {
    return this.format;
  };

  setImageData = (data, width, height) => {
    this.data = new ImageData(new Uint8ClampedArray(data), width, height);
  };

  getImageData = () => {
    return this.data;
  };

  getWidth = () => {
    return this.getImageData().width;
  };

  getHeight = () => {
    return this.getImageData().height;
  };

  getNumberOfPixels = () => {
    return this.getWidth() * this.getHeight();
  };

  /**
   * Return true if a pair of indexes
   * are in the range of the image.
   *
   * @param x horizontal index.
   * @param y vertical index.
   * @returns {boolean} true if indexes
   *          are in range and false otherwise.
   */
  indexesAreInRange = (x, y) => {
    return (x >= 0 && x <= this.getWidth())
        && (y >= 0 && y <= this.getHeight());
  };

  /**
   * Return true if color value
   * is in the range [Min, Max]-
   *
   * In most cases this range
   * corresponds to [0, 255].
   *
   * @param color
   * @returns {boolean}
   */
  static colorIsInRange = (color) => {
    return (color >= ProcessImage.MIN_PIXEL_VALUE)
        && (color <= ProcessImage.MAX_PIXEL_VALUE);
  };

  /**
   * Returns the color index in
   * the data array.
   *
   * @param x column of the pixel
   * @param y row of the pixel.
   * @returns {*} start index of the pixel.
   */
  getColorIndex = (x, y) => {
    if (this.indexesAreInRange(x, y)) {
      return y * (this.getWidth() * 4) + x * 4;
    } else {
      return undefined;
    }
  };

  /**
   * Return the component situated
   * at a specified position of the
   * array.
   *
   * @param position
   * @returns {*}
   */
  getComponent = position => {
    return this.data.data[position];
  };

  /**
   * Sets the data situated at
   * a specified position.
   *
   * @param position to set the color.
   * @param color that we want to set.
   */
  setComponent = (position, color) => {
    this.data.data = color;
  };

  /**
   * Returns the color corresponding
   * to the component.
   *
   * @param x column of the color
   * @param y row of the column.
   * @param component r,g,b,a string.
   * @returns {*} color component.
   */
  getColor = (x, y, component) => {
    if (component === 'brightness')
      return this.getBrightness(x, y);

    const numericComponent = ProcessImage.colorComponent[component];
    if (numericComponent === undefined)
      throw new Error('unknown component: ' + component);

    const index = this.getColorIndex(x, y);
    if (index === undefined)
      throw new Error('indexes are not in range.');

    return this.getComponent(index + numericComponent);
  };

  /**
   * Set the color of the component.
   *
   * @param x
   * @param y
   * @param component
   * @param color
   */
  setColor = (x, y, component, color) => {
    if (component === 'brightness')
      this.setBrightness(x, y, color);

    if (!ProcessImage.colorIsInRange(color))
      throw new Error('color is not in range.');

    const numericComponent = ProcessImage.colorComponent[component];
    if (numericComponent === undefined)
      throw new Error('unknown component: ' + component);

    const index = this.getColorIndex(x, y);
    if (index === undefined)
      throw new Error('indexes are not in range.');

    this.setComponent(index + numericComponent, color);
  };

  getRedComponent = (x, y) => {
    return this.getColor(x, y, 'r');
  };

  setRedComponent = (x, y, red) => {
    this.setColor(x, y, 'r', red);
  };

  getGreenComponent = (x, y) => {
    return this.getColor(x, y, 'g');
  };

  setGreenComponent = (x, y, green) => {
    this.setColor(x, y, 'g', green);
  };

  getBlueComponent = (x, y) => {
    return this.getColor(x, y, 'b');
  };

  setBlueComponent = (x, y, blue) => {
    this.setColor(x, y, 'b', blue);
  };

  getAlphaComponent = (x, y) => {
    return this.getColor(x, y, 'a');
  };

  setAlphaComponent = (x, y, alpha) => {
    this.setColor(x, y, 'a', alpha);
  };

  /**
   * Performs PAL conversion
   * of the components to calculate
   * brightness.
   *
   * @param x column of the pixel.
   * @param y row of the pixel.
   * @returns {number}
   */
  getBrightness = (x, y) => {
    const rgb = this.getRGBComponents(x, y);
    return Math.round(0.222 * rgb.r + 0.707 * rgb.g + 0.071 * rgb.b);
  };

  /**
   * Converts the specified position
   * into a greyscale brightness value.
   *
   * @param x column of the conversion.
   * @param y row of the conversion.
   * @param brightness
   */
  setBrightness = (x, y, brightness) => {
    this.setRGBComponents(x, y, brightness, brightness, brightness);
  };

  /**
   * getter for the 3 components of a pixel.
   *
   * @param x column of the pixel.
   * @param y row of the pixel.
   * @returns {{r: *, g: *, b: *}}
   *          object with configuration.
   */
  getRGBComponents = (x, y) => {
    return {
      r: this.getRedComponent(x, y),
      g: this.getGreenComponent(x, y),
      b: this.getBlueComponent(x, y)
    };
  };

  setRGBComponents = (x, y, red, green, blue) => {
    this.setRedComponent(x, y, red);
    this.setGreenComponent(x, y, green);
    this.setBlueComponent(x, y, blue);
  };

  /**
   * Getter for the four components of
   * a pixel.
   *
   * @param x column of the pixel.
   * @param y row of the pixel.
   * @returns {{r: *, g: *, b: *, a: *}}
   * object with configuration.
   */
  getRGBAComponents = (x, y) => {
    const rgb = this.getRGBComponents(x, y);
    return {
      r: rgb.r,
      g: rgb.g,
      b: rgb.b,
      a: this.getAlphaComponent(x, y)
    };
  };

  setRGBAComponets = (x, y, red, green, blue, alpha) => {
    this.setRGBComponents(x, y, red, green, blue);
    this.setAlphaComponent(x, y, alpha);
  };
}

export default ProcessImage;
