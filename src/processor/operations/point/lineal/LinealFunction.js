/**
 * This class simulates a
 * lineal function between two
 * points.
 */
class ClampedLinealFunction {
  a;
  b;

  constructor(p1, p2) {
    this.setEquationComponents(p1, p2);
  }

  get = x => {
    if (x === undefined)
      throw new Error("x is undefined.");
    return this.a * x + this.b;
  };

  setEquationComponents = (p1, p2) => {
    if (p1 === undefined || p2 === undefined) {
      throw new Error("points can not be undefined.");
    }
    if (p1.x === p2.x) {
      throw new Error("points x coordinate can not be equal.");
    }
    this.a = (p2.y - p1.y) / (p2.x - p1.x);
    this.b = p1.y - this.a * p1.x;
  };
}

export default ClampedLinealFunction;