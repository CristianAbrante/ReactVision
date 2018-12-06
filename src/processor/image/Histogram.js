import ProcessImage from './ProcessImage';

class Histogram {
  image;
  count = {
    r: [],
    g: [],
    b: [],
    brightness: []
  };

  accumulative = {
    r: [],
    g: [],
    b: [],
    brightness: []
  };

  min = {
    r: 0,
    g: 0,
    b: 0,
    brightness: 0
  };

  max = {
    r: 0,
    g: 0,
    b: 0,
    brightness: 0
  };

  mean = {
    r: 0,
    g: 0,
    b: 0,
    brightness: 0
  };

  stdVar = {
    r: 0,
    g: 0,
    b: 0,
    brightness: 0
  };

  entropy = {
    r: 0,
    g: 0,
    b: 0,
    brightness: 0
  };

  constructor(image) {
    this.setImage(image);
  }

  setImage = image => {
    this.image = image;
    this.setCount();
    this.setAccumulativeCount();
    this.setMean();
    this.setStdVar();
    this.setMinMax();
    this.setEntropy();
  };

  getCount = level => {
    return {
      r: this.count.r[level],
      g: this.count.g[level],
      b: this.count.b[level],
      brightness: this.count.brightness[level]
    }
  };

  getAccumulativeCount = level => {
    return {
      r: this.accumulative.r[level],
      g: this.accumulative.g[level],
      b: this.accumulative.b[level],
      brightness: this.accumulative.brightness[level]
    }
  };

  getProbability = level => {
    return {
      r: this.getCount(level).r / this.getNumberOfPixels(),
      g: this.getCount(level).g / this.getNumberOfPixels(),
      b: this.getCount(level).b / this.getNumberOfPixels(),
      brightness: this.getCount(level).brightness / this.getNumberOfPixels()
    }
  };

  getAccumulativeProbability = level => {
    return {
      r: this.getAccumulativeCount(level).r / this.getNumberOfPixels(),
      g: this.getAccumulativeCount(level).g / this.getNumberOfPixels(),
      b: this.getAccumulativeCount(level).b / this.getNumberOfPixels(),
      brightness: this.getAccumulativeCount(level).brightness / this.getNumberOfPixels()
    }
  };

  getMean = () => {
    return this.mean;
  };

  getStdVar = () => {
    return this.stdVar;
  };

  getMax = () => {
    return this.max;
  };

  getMin = () => {
    return this.min;
  };

  getEntropy = () => {
    return this.entropy;
  };

  getImage = () => {
    return this.image;
  };

  getImageWidth = () => {
    return this.getImage().getWidth();
  };

  getImageHeight = () => {
    return this.getImage().getHeight();
  };

  getNumberOfPixels = () => {
    return this.getImage().getNumberOfPixels();
  };

  getFormattedCount = component => {
    return this.formatData(this.count[component]);
  };

  getFormattedAccumulativeCount = component => {
    return this.formatData(this.accumulative[component]);
  };

  getFormattedData = (component, accumulative) => {
    if (accumulative) {
      return this.getFormattedAccumulativeCount(component);
    } else {
      return this.getFormattedCount(component);
    }
  };

  formatData = array => {
    let data = [];
    for (let i = 0; i < array.length; i++) {
      data.push({x: i, y: array[i]});
    }
    return data;
  };

  initializeObject = obj => {
    let components = Object.keys(obj);
    for (let k = 0; k < components.length; k++) {
      obj[components[k]] =
          Array.apply(null, Array(ProcessImage.MAX_PIXEL_VALUE)).fill(0);
    }
  };

  setCount = () => {
    this.initializeObject(this.count);
    let components = Object.keys(this.count);
    for (let i = 0; i < this.getImageWidth(); i++) {
      for (let j = 0; j < this.getImageHeight(); j++) {
        if (this.image.getAlphaComponent(i, j) !== 0) {
          for (let k = 0; k < components.length; k++) {
            let component = components[k];
            let value = this.image.getColor(i, j, component);
            this.count[component][value] += 1;
          }
        }
      }
    }
  };

  setAccumulativeCount = () => {
    this.initializeObject(this.accumulative);
    let components = Object.keys(this.accumulative);
    for (let k = 0; k < components.length; k++) {
      let component = components[k];
      this.accumulative[component][0] = this.getCount(0)[component];
    }
    for (let i = 1; i < ProcessImage.MAX_PIXEL_VALUE; i++) {
      for (let k = 0; k < components.length; k++) {
        let component = components[k];
        let prevValue = this.getAccumulativeCount(i - 1)[component];
        let actualValue = this.getCount(i)[component];
        this.accumulative[component][i] = prevValue + actualValue;
      }
    }
  };

  setMean = () => {
    let components = Object.keys(this.mean);
    for (let i = 0; i < ProcessImage.MAX_PIXEL_VALUE; i++) {
      for (let k = 0; k < components.length; k++) {
        let component = components[k];
        this.mean[component] += this.getCount(i)[component] * i;
      }
    }
    for (let k = 0; k < components.length; k++) {
      let component = components[k];
      this.mean[component] /= this.getNumberOfPixels();
    }
  };

  setStdVar = () => {
    let components = Object.keys(this.stdVar);
    for (let i = 0; i < ProcessImage.MAX_PIXEL_VALUE; i++) {
      for (let k = 0; k < components.length; k++) {
        let component = components[k];
        this.stdVar[component] +=
            this.getCount(i)[component] * Math.pow(i - this.mean[component], 2);
      }
    }
    for (let k = 0; k < components.length; k++) {
      let component = components[k];
      this.stdVar[component] =
          Math.sqrt(this.stdVar[component] / this.getNumberOfPixels());
    }
  };

  setMinMax = () => {
    let components = Object.keys(this.min);
    let selected = {};
    for (let k = 0; k < components.length; k++) {
      selected[components[k]] = false;
    }
    for (let i = 0; i < ProcessImage.MAX_PIXEL_VALUE; i++) {
      for (let k = 0; k < components.length; k++) {
        let component = components[k];
        if (this.getCount(i)[component] !== 0) {
          if (!selected[component]) {
            this.min[component] = i;
            selected[component] = true;
          }
          this.max[component] = i;
        }
      }
    }
  };

  setEntropy = () => {
    this.entropy = {
      r: 0,
      g: 0,
      b: 0,
      brightness: 0
    };

    let components = Object.keys(this.entropy);
    for (let i = 0; i < ProcessImage.MAX_PIXEL_VALUE; i++) {
      for (let k = 0; k < components.length; k++) {
        let component = components[k];
        let p = this.getProbability(i)[component];
        if (p !== 0 && p >= 0) {
          this.entropy[component] += p * Math.log2(p);
        }
      }
    }
    for (let k = 0; k < components.length; k++) {
      let component = components[k];
      this.entropy[component] = -this.entropy[component];
    }
  };
}

export default Histogram;
