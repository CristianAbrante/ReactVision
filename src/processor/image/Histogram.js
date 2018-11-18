
const NUMBER_OF_PIXELS = 256;

class Histogram {
  image;
  redValues;
  greenValues;
  blueValues;
  brightnessValues;
  
  accumulativeRedValues;
  accumulativeGreenValues;
  accumulativeBlueValues;
  accumulativeBrightnessValues;

  numberOfPixels;
  minValue;
  maxValue;
  redMean;
  greenMean;
  blueMean;
  redStdVar;
  greenStdVar;
  blueStdVar;
  brightnessMean;
  brightnessStdVar;

  constructor(image) {
    this.setImage(image);
  }

  setImage = image => {
    this.image = image;
    this.setHistogramValues();
    this.setAccumulativeHistogram();
    this.setMean();
    this.setStdVar();
    this.setMinMax();
  };

  getRedCount = value => {
    return this.redValues[value];
  };

  getGreenCount = value => {
    return this.greenValues[value];
  };

  getBlueCount = value => {
    return this.blueValues[value];
  };

  getBrightnessCount = value => {
    return this.brightnessValues[value];
  };

  getNumberOfPixels = () => {
    return this.numberOfPixels;
  };

  setHistogramValues = () => {
    this.numberOfPixels = 0;
    this.redValues = Array.apply(null, Array(NUMBER_OF_PIXELS)).map(() => {return 0});
    this.greenValues = Array.apply(null, Array(NUMBER_OF_PIXELS)).map(() => {return 0});
    this.blueValues = Array.apply(null, Array(NUMBER_OF_PIXELS)).map(() => {return 0});
    this.brightnessValues = Array.apply(null, Array(NUMBER_OF_PIXELS)).map(() => {return 0});

    for (let i = 0; i < this.image.width; i++) {
      for (let j = 0; j < this.image.height; j++) {
        this.numberOfPixels += 1;
        let rValue = this.image.getRedComponent(i, j);
        this.redValues[rValue] += 1;
        let gValue = this.image.getGreenComponent(i, j);
        this.greenValues[gValue] += 1;
        let bValue = this.image.getBlueComponent(i, j);
        this.blueValues[bValue] += 1;
        let brightValue = this.image.getBrightness(i, j);
        this.brightnessValues[brightValue] += 1;
      }
    }
  };

  setAccumulativeHistogram = () => {
    this.accumulativeRedValues = [this.redValues[0]];
    this.accumulativeGreenValues = [this.greenValues[0]];
    this.accumulativeBlueValues = [this.blueValues[0]];
    this.accumulativeBrightnessValues = [this.brightnessValues[0]];

    for (let i = 1; i < NUMBER_OF_PIXELS; i++) {
      let prevValue = this.accumulativeRedValues[i - 1];
      this.accumulativeRedValues.push(prevValue + this.redValues[i]);
      prevValue = this.accumulativeGreenValues[i - 1];
      this.accumulativeGreenValues.push(prevValue + this.greenValues[i]);
      prevValue = this.accumulativeBlueValues[i - 1];
      this.accumulativeBlueValues.push(prevValue + this.blueValues[i]);
      prevValue = this.accumulativeBrightnessValues[i - 1];
      this.accumulativeBrightnessValues.push(prevValue + this.brightnessValues[i]);
    }
  };

  setMean = () => {
    this.redMean = 0;
    this.greenMean = 0;
    this.blueMean = 0;
    this.brightnessMean = 0;
    for (let i = 0; i < NUMBER_OF_PIXELS; i++) {
      this.redMean += this.getRedCount(i) * i;
      this.greenMean += this.getGreenCount(i) * i;
      this.blueMean += this.getBlueCount(i) * i;
      this.brightnessMean += this.getBrightnessCount(i) * i;
    }
    this.redMean /= this.getNumberOfPixels();
    this.greenMean /= this.getNumberOfPixels();
    this.blueMean /= this.getNumberOfPixels();
    this.brightnessMean /= this.getNumberOfPixels();
  };

  setStdVar = () => {
    this.redStdVar = 0;
    this.greenStdVar = 0;
    this.blueStdVar = 0;
    this.brightnessStdVar = 0;
    for (let i = 0; i < NUMBER_OF_PIXELS; i++) {
      this.redStdVar += this.getRedCount(i) * Math.pow(i - this.redMean, 2);
      this.greenStdVar += this.getGreenCount(i) * Math.pow(i - this.greenMean, 2);
      this.blueStdVar += this.getBlueCount(i) * Math.pow(i - this.blueMean, 2);
      this.brightnessStdVar += this.getBrightnessCount(i) * Math.pow(i - this.brightnessMean, 2);
    }
    this.redStdVar = Math.sqrt(this.redStdVar / this.getNumberOfPixels());
    this.greenStdVar = Math.sqrt(this.greenStdVar / this.getNumberOfPixels());
    this.blueStdVar = Math.sqrt(this.blueStdVar / this.getNumberOfPixels());
    this.brightnessStdVar = Math.sqrt(this.brightnessStdVar / this.getNumberOfPixels());
  };

  setMinMax = () => {
    let minSelected = false;
    this.minValue = 0;
    this.maxValue = 0;
    for (let i = 0; i < NUMBER_OF_PIXELS; i++) {
      if (this.getBrightnessCount(i) !== 0) {
        if (!minSelected) {
          this.minValue = i;
          minSelected = true;
        }
        this.maxValue = i;
      }
    }
  };

  getMean = () => {
    return this.brightnessMean;
  };

  getStdVar = () => {
    return this.brightnessStdVar;
  };

  getMax = () => {
    return this.maxValue;
  };

  getMin = () => {
    return this.minValue;
  };
  
  getData = array => {
    let data = [];
    for (let i = 0; i < array.length; i++) {
      data.push({x: i, y: array[i]});
    }
    return data;
  };

  getRedData = accumulative => {
    if (accumulative) {
      return this.getData(this.accumulativeRedValues);
    } else {
      return this.getData(this.redValues);
    }
  };

  getGreenData = accumulative => {
    if (accumulative) {
      return this.getData(this.accumulativeGreenValues);
    } else {
      return this.getData(this.greenValues);
    }
  };

  getBlueData = accumulative => {
    if (accumulative) {
      return this.getData(this.accumulativeBlueValues);
    } else {
      return this.getData(this.blueValues);
    }
  };

  getBrightnessData = accumulative => {
    if (accumulative) {
      return this.getData(this.accumulativeBrightnessValues);
    } else {
      return this.getData(this.brightnessValues);
    }
  };
}

export default Histogram;