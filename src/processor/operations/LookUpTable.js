
const NUMBER_OF_VALUES = 256;
class LookUpTable {
  values = new Array(NUMBER_OF_VALUES);
  constructor() {
    this.values =
        Array.apply(null, Array(NUMBER_OF_VALUES)).map(() => {return 0});
  }

  fillTable = (operation) => {
    this.values =
        Array.apply(null, Array(NUMBER_OF_VALUES)).map(() => {return 0});
    for (let i = 0; i < NUMBER_OF_VALUES; i++) {
      this.setValue(i, operation(i));
    }
  };

  setValue = (level, value) => {
    if (this.inputIsValid(level) && this.inputIsValid(value)) {
      this.values[level] = value;
    }
  };

  getValue = level => {
    if (this.inputIsValid(level)) {
      return this.values[level];
    } else {
      return undefined;
    }
  };

  inputIsValid = (input) => {
    return (input >= 0 && input < NUMBER_OF_VALUES);
  };
}

export default LookUpTable;