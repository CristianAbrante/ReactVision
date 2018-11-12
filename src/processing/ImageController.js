class ImageController {
  images;
  canvas;
  updateMethod;

  constructor(updateMethod) {
    this.images = []
    this.updateMethod = updateMethod;
  }

  add = (image) => {
    this.images.push(image);

    this.canvas.width = image.width;
    this.canvas.height = image.height;
    let ctx = this.canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

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
    console.log('setting canvas');
    console.log(canvas);
    this.canvas = canvas;
  }
}

export default ImageController;