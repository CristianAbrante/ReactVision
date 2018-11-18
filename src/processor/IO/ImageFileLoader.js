import ProcessImage from '../image/ProcessImage'
import pixels from 'get-pixels';

class ImageFileLoader {
  fileName;
  image;
  imageData;

  getReadFile = () => {
    return this.image;
  };

  getImageData() {
    return this.imageData;
  }

  setImage = data => {
    let shape = data.shape;
    // test if it is a GIF image.
    let width = shape.length === 3 ? shape[0] : shape[1];
    let height = shape.length === 3 ? shape[1] : shape[2];
    this.image = new ProcessImage(this.fileName, data.data, width, height);
  };

  load(inputNode, callback) {
    if (!inputNode.files) {
      throw new Error("browser do not support image loading");
    } else {
      let file = inputNode.files[0];
      this.fileName = file.name;
      if (!ImageFileLoader.isAnImage(file))
        throw new Error('should load a valid image file.');

      let fileReader = new FileReader();
      fileReader.onload = () => {
        pixels(fileReader.result, (err, pixels) => {
          if (err) {
            throw new Error(err.message);
          }
          this.setImage(pixels);
          callback();
        });
      };
      fileReader.readAsDataURL(file);
    }
  }

  static isAnImage(file) {
    return file.type.includes('image');
  }
}

export default ImageFileLoader;