import Histogram from '../image/Histogram';

class ImageController {
  images;
  histograms;
  canvas;
  updateMethod;
  resetActionMethod;
  selected;

  constructor(updateMethod, resetActionMethod) {
    this.images = [];
    this.histograms = [];
    this.updateMethod = updateMethod;
    this.resetActionMethod = resetActionMethod;
  }

  add = (image) => {
    this.images.push(image);
    this.histograms.push(new Histogram(image));
    this.selected = this.numberOfImages() - 1;
    this.updateImageCanvas();
    this.resetActionMethod(undefined);
    this.updateMethod();
  };

  delete = (index) => {
    console.log(index)
    if(index > -1) {
      this.images.splice(index, 1);
      this.histograms.splice(index, 1);
    }


    if(index < this.images.length - 1)
      this.selected++;
    console.log(this.selected)
  }

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
    this.resetActionMethod(undefined);
    this.updateMethod();
  };

  updateImageCanvas = () => {
    let imageToDisplay = this.getSelectedImage();

    if(imageToDisplay != undefined){
      this.canvas.width = imageToDisplay.getWidth();
      this.canvas.height = imageToDisplay.getHeight();
      let ctx = this.canvas.getContext('2d');
      ctx.putImageData(imageToDisplay.getImageData(), 0, 0);
    }else{
      let context = this.canvas.getContext('2d');
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
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

  applyPointOperation(table, component, retrieveDataFromPreviousState) {
    let image = this.getSelectedImage();
    for (let i = 0; i < image.getWidth(); i++) {
      for (let j = 0; j < image.getHeight(); j++) {
        image.setPreviousState();
        let imageColor = image.getColor(i, j, component);
        image.setNextState();
        let tableColor = table.getValue(imageColor);
        image.setColor(i, j, component, tableColor);
      }
    }
    this.updateImageHistogram();
    this.updateImageCanvas();
    this.updateMethod();
  }

  isAnyImageSelected = () => {
    return this.images.length !== 0;
  };

  updateImageHistogram = () => {
    let histogram = this.histograms[this.getSelectedImageIndex()];
    histogram.setImage(this.getSelectedImage());
  };

  getImageIndex = title => {
    let titles = this.getImageTitles();
    for (let i = 0; i < titles.length; i++) {
      if (titles[i] === title)
        return i;
    };
    return undefined;
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
