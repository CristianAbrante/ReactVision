class ImageController {
  images;
  canvas;
  updateMethod;
  selected;

  constructor(updateMethod) {
    this.images = []
    this.updateMethod = updateMethod;
  }

  add = (image) => {
    this.images.push(image);
    this.selected = this.images.length - 1;
    this.updateImageCanvas();
    this.updateMethod();
  }

  numberOfImages = () => {
    return this.images.length;
  }

  getImageTitles = () => {
    let titles = [];
    for (let i = 0; i < this.numberOfImages(); i++)
      titles.push(this.images[i].title);
    return titles;
  }

  setCanvas = canvas => {
    this.canvas = canvas;
  }

  updateSelectedImage(index) {
    this.selected = index;
    this.updateImageCanvas();
    this.updateMethod();
  }

  updateImageCanvas() {
    let imageToDisplay = this.images[this.selected];
    this.canvas.width = imageToDisplay.width;
    this.canvas.height = imageToDisplay.height;
    let ctx = this.canvas.getContext('2d');
    ctx.drawImage(imageToDisplay, 0, 0);
  }

  getSelectedImage() {
    return this.images[this.getSelectedImageIndex()];
  }

  getSelectedImageIndex() {
    return this.selected;
  }
}

export default ImageController;
