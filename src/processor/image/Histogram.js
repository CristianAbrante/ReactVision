
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

  constructor(image) {
    this.setImage(image);
  }

  setImage = image => {
    this.image = image;
    this.setHistogramValues();
  };

  setHistogramValues = () => {
    this.redValues = Array.apply(null, Array(NUMBER_OF_PIXELS)).map(() => {return 0});
    this.greenValues = Array.apply(null, Array(NUMBER_OF_PIXELS)).map(() => {return 0});
    this.blueValues = Array.apply(null, Array(NUMBER_OF_PIXELS)).map(() => {return 0});
    this.brightnessValues = Array.apply(null, Array(NUMBER_OF_PIXELS)).map(() => {return 0});

    for (let i = 0; i < this.image.width; i++) {
      for (let j = 0; j < this.image.height; j++) {
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
    this.setAccumulativeHistogram();
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