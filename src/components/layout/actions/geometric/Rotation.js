import React, {Component} from 'react';
import RotationOperation from '../../../../processor/operations/geometric/rotation/Rotation';
import RawRotation from '../../../../processor/operations/geometric/rotation/RawRotation';
import InterpolatedRotation from '../../../../processor/operations/geometric/rotation/InterpolatedRotation';
import NearestNeighbourInterpolator
  from '../../../../processor/operations/geometric/interpolator/NearestNeighbourInterpolator';
import BilinealInterpolator
  from '../../../../processor/operations/geometric/interpolator/BilinealInterpolator';
import Icon from '@material-ui/core/Icon/Icon';
import Typography from '@material-ui/core/Typography/Typography';
import Divider from '@material-ui/core/Divider/Divider';
import Slider from '@material-ui/lab/Slider/Slider';
import TextField from '@material-ui/core/TextField/TextField';
import Theme from '../../../theme';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button/Button';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import FormControl from '@material-ui/core/FormControl/FormControl';

const styles = {
  root: {
    width: 400,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "space-between",
    margin: "auto"
  },
  slider: {
    width: '180px',
    margin: 'auto',
  },
  thumb: {
    background: Theme.palette.secondary.main
  },
  formControl: {
    margin: Theme.spacing.unit,
    minWidth: 120,
  },
};

const MIDDLE_ANGLE = (RotationOperation.MAX_ANGLE + RotationOperation.MIN_ANGLE) / 2;

class Rotation extends Component {
  interpolators = {
    nearestNeighbour: new NearestNeighbourInterpolator(),
    bilineal: new BilinealInterpolator(),
  };

  rotationMethods = {
    raw: new RawRotation(),
    interpolated: new InterpolatedRotation(),
  };

  state = {
    angle: MIDDLE_ANGLE,
    selectedInterpolator: Object.keys(this.interpolators)[0],
    selectedRotationMethod: Object.keys(this.rotationMethods)[0],
  };

  applyOperation = () => {
    let {controller} = this.props;
    if (controller.isAnyImageSelected()) {
      let image = controller.getSelectedImage();
      let {angle} = this.state;
      let rotation = this.getRotationMethod();
      rotation.perform(image, angle, this.getInterpolator());
      image.setNextState();

      controller.updateImageHistogram();
      controller.updateImageCanvas();
      controller.resetActionMethod(undefined);
      controller.updateMethod();
    }
  };

  getRotationMethod = () => {
    return this.rotationMethods[this.state.selectedRotationMethod];
  };

  getInterpolator = () => {
    return this.interpolators[this.state.selectedInterpolator];
  };

  onAngleChanged = (event, value) => {
    this.setState({angle: value});
  };

  onAngleTextChanged = event => {
    let angle = Number.parseFloat(event.target.value);
    if (RotationOperation.angleIsValid(angle)) {
      this.setState({angle: angle});
    }
  };

  onInterpolatorSelected = event => {
    this.setState({selectedInterpolator: event.target.value})
  };

  onRotationMethodSelected = event => {
    this.setState({selectedRotationMethod: event.target.value});
  };

  interpolatorSelectorDisabled = () => {
    return this.state.selectedRotationMethod !== 'interpolated'
  };

  getHeader = () => {
    return
  }

  render() {
    let {classes} = this.props;
    return(
        <div>
          <FormControl className={classes.formControl}>
            <Select
                value={this.state.selectedRotationMethod}
                onChange={this.onRotationMethodSelected}
                autoWidth
            >
              {Object.keys(this.rotationMethods).map(interpolatorName => {
                return <MenuItem
                    key={interpolatorName}
                    value={interpolatorName}>{interpolatorName}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Select
                value={this.state.selectedInterpolator}
                onChange={this.onInterpolatorSelected}
                disabled={this.interpolatorSelectorDisabled()}
                autoWidth
            >
              {Object.keys(this.interpolators).map(rotationMethod => {
                return <MenuItem
                    key={rotationMethod}
                    value={rotationMethod}>{rotationMethod}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <div className={classes.root}>
            <Typography variant="caption" style={{margin: 10}}>Horizontal factor</Typography>
            <Slider
                classes={
                  { container: classes.slider,
                    track: classes.thumb,
                    thumb: classes.thumb}
                }
                min = {RotationOperation.MIN_ANGLE}
                max = {RotationOperation.MAX_ANGLE}
                value={this.state.angle}
                aria-labelledby="label"
                onChange={this.onAngleChanged}
            />
            <TextField
                style={{margin: "15px"}}
                value={this.state.angle}
                type="number"
                margin="normal"
                onChange={this.onAngleTextChanged}
                color="secondary"
            />
          </div>
          <Button
              style={{margin: "10px"}}
              variant="extendedFab"
              color="secondary"
              onClick={this.applyOperation}>
            Apply Rotation
          </Button>
        </div>
    )
  }
}

export default withStyles(styles)(Rotation);
