import ProcessImage from '../../image/ProcessImage';

class LookUpTable {
  values;
  constructor(operation) {
    this.fillTable(operation);
  }

  fillTable = (operation) => {
    this.values = [];
    for (let i = 0; i < ProcessImage.MAX_PIXEL_VALUE; i++) {
      this.appendValue(operation.perform(i));
    }
  };

  getValue = level => {
    if (this.inputIsValid(level)) {
      return this.values[level];
    } else {
      return undefined;
    }
  };

  appendValue = value => {
    if (this.inputIsValid(value)) {
      this.values.push(value);
    }
  };

  inputIsValid = (input) => {
    return (input >= 0
        && input < ProcessImage.MAX_PIXEL_VALUE);
  };
}

export default LookUpTable;