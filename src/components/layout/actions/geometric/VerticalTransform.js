import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import VerticalProcessor from '../../../../processor/image/operations/VerticalTransformProcessor';

class VerticalTransform extends Component {

  applyOperation = () => {
    let {controller} = this.props;
    VerticalProcessor.getGeometricChange(controller.getSelectedImage());
    controller.updateImageHistogram();
    controller.updateImageCanvas();
    controller.updateMethod();
  };

  render() {
    return(
      <div>
        <Button
            variant="fab"
            color="secondary"
            aria-label="Add"
            onClick={this.applyOperation}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}

export default VerticalTransform;
