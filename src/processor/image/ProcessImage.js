
class ProcessImage {
  title;
  data;
  width;
  height;

  constructor(title, data, width, height) {
    this.title = title;
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
  }
}

export default ProcessImage;