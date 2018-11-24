import Histogram from '../image/Histogram';

class ImageController {
  images;
  histograms;
  canvas;
  updateMethod;
  selected;

  constructor(updateMethod) {
    this.images = [];
    this.histograms = [];
    this.updateMethod = updateMethod;
  }

  add = (image) => {
    this.images.push(image);
    this.histograms.push(new Histogram(image));
    this.selected = this.numberOfImages() - 1;
    this.updateImageCanvas();
    this.updateMethod();
  };

  numberOfImages = () => {
    return this.images.length;
  };

  getImageTitles = () => {
    return this.images.map(image => {return image.getTitle()});
  };

  setCanvas = canvas => {
    this.canvas = canvas;
  };

  getCanvas = () => {
    return this.canvas;
  }

  updateSelectedImage = index => {
    this.selected = index;
    this.updateImageCanvas();
    this.updateMethod();
  };

  updateImageCanvas = () => {
    let imageToDisplay = this.getSelectedImage();
    this.canvas.width = imageToDisplay.getWidth();
    this.canvas.height = imageToDisplay.getHeight();
    let ctx = this.canvas.getContext('2d');
    ctx.putImageData(imageToDisplay.getImageData(), 0, 0);
  };

  getSelectedImage = () => {
    return this.images[this.getSelectedImageIndex()];
  };

  getCurrentHistogram = () => {
    return this.histograms[this.getSelectedImageIndex()];
  };

  getSelectedImageIndex = () => {
    return this.selected;
  };

  static imageIsValid(image) {
    if (image === undefined) {
      return false;
    }
    if (image.getImageData() === undefined) {
      return false;
    }
  }
}

export default ImageController;
