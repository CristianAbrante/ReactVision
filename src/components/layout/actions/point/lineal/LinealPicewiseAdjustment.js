import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import LinealPicewiseAdjustmentOperation from '../../../../../processor/operations/point/lineal/LinealPicewiseAdjustment';

class LinealPicewiseAdjustment extends Component {
  linealPicewiseOperation;
  constructor(props) {
    super(props);
    this.linealPicewiseOperation =
        new LinealPicewiseAdjustmentOperation();
  }

  render() {
    return (
        <div>
          This is the lineal picewise adjustment
        </div>
    );
  }
}

export default LinealPicewiseAdjustment;