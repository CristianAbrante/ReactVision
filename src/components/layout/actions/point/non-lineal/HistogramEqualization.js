import React, {Component} from 'react';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import HistogramEqualizationOperation
  from '../../../../../processor/operations/point/non-lineal/HistogramEqualization';
import LookUpTable
  from '../../../../../processor/operations/point/LookUpTable';

class HistogramEqualization extends Component {
  operationHasBeenApplied;

  applyOperation = () => {
    let {controller} = this.props;
    if (controller.isAnyImageSelected()
        && !this.operationHasBeenApplied) {
      let image = controller.getSelectedImage();
      let histogram = controller.getCurrentHistogram();
      image.createNewState();
      image.setNextState();
      let equalization =
          new HistogramEqualizationOperation(histogram);
      let lut = new LookUpTable(equalization);
      controller.applyPointOperation(lut, 'brightness');
      this.operationHasBeenApplied = true;
    }
  };

  render() {
    return (
        <div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Icon style={{padding: "5px"}}>gradient</Icon>
            <Typography
                variant="overline">
              Histogram Equalization
            </Typography>
          </div>
          <Divider/>
          <Button
              style={{margin: "10px"}}
              variant="extendedFab"
              color="secondary"
              onClick={this.applyOperation}>
            Apply Equalization
          </Button>
        </div>
    )
  }
}

export default HistogramEqualization;

