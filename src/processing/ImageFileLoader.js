import ProcessImage from './ProcessImage'

class ImageFileLoader {
  image;

  getReadFile = () => {
    return this.image;
  }

  load(inputNode, callback) {
    console.log("trying");
    if (!inputNode.files) {
      throw new Error("browser do not support image loading");
    } else {
      let file = inputNode.files[0];
      let fileName = file.name;
      if (!this.isAnImage(file))
        throw new Error('should load a valid image file.');

      let fileReader = new FileReader();
      fileReader.onload = () => {
        this.image = new ProcessImage(fileName);
        this.image.onload = callback;
        this.image.src = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  isAnImage(file) {
    return file.type.includes('image');
  }
}

export default ImageFileLoader;