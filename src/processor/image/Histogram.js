
class Histogram {
  image;
  histogramRValues;
  histogramGValues;
  histogramBValues;

  constructor(image) {
    this.setImage(image);
  }

  setImage = image => {
    this.image = image;
    this.setHistogramValues();
  };

  setHistogramValues = () => {
    this.histogramRValues = Array.apply(null, Array(256)).map(() => {return 0});
    this.histogramGValues = Array.apply(null, Array(256)).map(() => {return 0});
    this.histogramBValues = Array.apply(null, Array(256)).map(() => {return 0});

    for (let i = 0; i < this.image.width; i++) {
      for (let j = 0; j < this.image.height; j++) {
        let rValue = this.image.getRedComponent(i, j);
        this.histogramRValues[rValue] += 1;
        let gValue = this.image.getRedComponent(i, j);
        this.histogramGValues[gValue] += 1;
        let bValue = this.image.getRedComponent(i, j);
        this.histogramBValues[bValue] += 1;
      }
    }
  };

  getData = array => {
    let data = [];
    for (let i = 0; i < array.length; i++) {
      data.push({x: i, y: array[i]});
    }
    return data;
  };

  getRedData = (accumulative) => {
    return this.getData(this.histogramRValues);
  };

  getGreenData = (accumulative) => {
    return this.getData(this.histogramGValues);
  };

  getBlueData = (accumulative) => {
    return this.getData(this.histogramBValues);
  }
}

export default Histogram;