import React, {Component} from 'react';
import Icon from '@material-ui/core/Icon/Icon';
import Typography from '@material-ui/core/Typography/Typography';
import Divider from '@material-ui/core/Divider/Divider';
import CrossImageGraph from './CrossImageGraph';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import Switch from '@material-ui/core/Switch/Switch';
import FormControlLabel
  from '@material-ui/core/FormControlLabel/FormControlLabel';

import CrossImageSelectionOperation
  from '../../../../../../processor/operations/point/non-lineal/ImageCrossSelection';

class CrossImageSelection extends Component {
  state = {
    crossImageSelection: undefined,
    derivative: false,
    beginPoint: {
      x: 0,
      y: 0,
    },
    endPoint: {
      x: 0,
      y: 0,
    }
  };

  applyOperation = () => {
    let {controller} = this.props;
    if (controller.isAnyImageSelected()) {
      let image = controller.getSelectedImage();
      this.setState({
        crossImageSelection: this.getSectionOperation(image, this.state.beginPoint, this.state.endPoint)
      });
    }
  };

  getSectionOperation = (image, beginPoint, endPoint) => {
    return new CrossImageSelectionOperation(image, beginPoint, endPoint);
  };

  getData = () => {
    if (this.state.crossImageSelection !== undefined) {
      if (this.state.derivative) {
        console.log(this.state.crossImageSelection.getFormattedDerivativeSelection());
        return this.state.crossImageSelection.getFormattedDerivativeSelection();
      } else {
        return this.state.crossImageSelection.getFormattedCrossSelection();
      }
    }
  };

  onInsertionValueChanged = (point, component) => event => {
    let currentImage = this.props.controller.getSelectedImage();
    let value = Number.parseInt(event.target.value);
    if (currentImage !== undefined && value !== undefined) {
      let newPoint = {
        x: component === 'x' ? value : this.state[point].x,
        y: component === 'y' ? value : this.state[point].y,
      };
      if (this.pointIsValid(newPoint, currentImage)) {
        this.setState({[point]: newPoint});
      }
    }
  };

  onSwitchChecked = value => event => {
    this.setState({[value]: event.target.checked});
  };

  pointIsValid = (point, image) => {
    return point.x >= 0 && point.x < image.getWidth()
        && point.y >= 0 && point.y < image.getHeight();
  };

  render() {
    return (
        <div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Icon style={{padding: "5px"}}>timeline</Icon>
            <Typography
                variant="overline">
              Cross Image Selection
            </Typography>
          </div>
          <Divider/>
          <div>
            <FormControlLabel
                control={
                  <Switch
                      checked={this.state.derivative}
                      onChange={this.onSwitchChecked('derivative')}
                      value="checkedA"
                  />
                }
                label="derivative"/>
          </div>
          <div>
            <CrossImageGraph data={this.getData()}/>
            <div>
              <TextField
                  style={{margin: "15px"}}
                  label="X"
                  value={this.state.beginPoint.x}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  onChange={this.onInsertionValueChanged('beginPoint', 'x')}
              />
              <TextField
                  style={{margin: "15px"}}
                  label="Y"
                  value={this.state.beginPoint.y}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  onChange={this.onInsertionValueChanged('beginPoint', 'y')}
              />
            </div>
            <div>
              <TextField
                  style={{margin: "15px"}}
                  label="X"
                  value={this.state.endPoint.x}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  onChange={this.onInsertionValueChanged('endPoint', 'x')}
              />
              <TextField
                  style={{margin: "15px"}}
                  label="Y"
                  value={this.state.endPoint.y}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  onChange={this.onInsertionValueChanged('endPoint', 'y')}
              />
            </div>
            <Button
                style={{margin: "10px"}}
                variant="extendedFab"
                color="secondary"
                onClick={this.applyOperation}>
              Visualize
            </Button>
          </div>
        </div>
    )
  }
}

export default CrossImageSelection;