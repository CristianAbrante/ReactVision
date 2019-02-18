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
import Slider from '@material-ui/lab/Slider/Slider';
import { withStyles } from '@material-ui/core/styles';

import Theme from '../../../../../theme';
import CrossImageSelectionOperation
  from '../../../../../../processor/operations/point/non-lineal/ImageCrossSelection';

const styles = {
  root: {
    width: 420,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "space-between",
    margin: "auto"
  },
  slider: {
    width: '150px',
    margin: 'auto',
  },
  thumb: {
    background: Theme.palette.secondary.main
  }
};

class CrossImageSelection extends Component {
  state = {
    crossImageSelection: undefined,
    derivative: false,
    radius: 0,
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
        crossImageSelection: this.getSectionOperation(image, this.state.radius, this.state.beginPoint, this.state.endPoint)
      });
      this.displaySectionLine();
    }
  };

  getSectionOperation = (image, radius, beginPoint, endPoint) => {
    return new CrossImageSelectionOperation(image, radius, beginPoint, endPoint);
  };

  getData = () => {
    if (this.state.crossImageSelection !== undefined) {
      if (this.state.derivative) {
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

  displaySectionLine = () => {
    let fillCircle = (ctx, point) => {
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'red';
      ctx.fill();
    };

    let {beginPoint, endPoint} = this.state;
    let controller = this.props.controller;
    controller.updateImageCanvas();
    let canvas = controller.getCanvas();
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(beginPoint.x, beginPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.stroke();
    fillCircle(ctx, beginPoint);
    fillCircle(ctx, endPoint);
  };

  onRadiusChanged = (event, value) => {
    this.setState({radius: value});
  };

  onRadiusTextChange = event => {
    let value = Number.parseInt(event.target.value);
    if (CrossImageSelectionOperation.isAValidRadius(value)) {
      this.setState({gamma: value});
    }
  };

  render() {
    const {classes} = this.props;
    return (
        <div>
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
            <div className={classes.root}>
              <Slider
                  classes = {
                    {
                      container: classes.slider,
                      track: classes.thumb,
                      thumb: classes.thumb
                    }
                  }
                  min = {CrossImageSelectionOperation.MIN_RADIUS}
                  max = {CrossImageSelectionOperation.MAX_RADIUS}
                  step={1}
                  value={this.state.radius}
                  aria-labelledby="label"
                  onChange={this.onRadiusChanged}
              />
              <TextField
                  style={{margin: "15px"}}
                  value={this.state.radius}
                  type="number"
                  margin="normal"
                  onChange={this.onRadiusTextChange}
                  color="secondary"
              />
            </div>
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

export default withStyles(styles)(CrossImageSelection);
