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

  setCanv

export default ImageController;
