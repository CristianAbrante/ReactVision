import React, {Component} from 'react';
import RotationOperation from '../../../../processor/operations/geometric/rotation/Rotation';
import RawRotation from '../../../../processor/operations/geometric/rotation/RawRotation';
import Icon from '@material-ui/core/Icon/Icon';
import Typography from '@material-ui/core/Typography/Typography';
import Divider from '@material-ui/core/Divider/Divider';
import Slider from '@material-ui/lab/Slider/Slider';
import ScalingOperation
  from '../../../../processor/operations/geometric/Scaling';
import TextField from '@material-ui/core/TextField/TextField';
import Theme from '../../../theme';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button/Button';

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
  state = {
    angle: MIDDLE_ANGLE,
  };

  applyOperation = () => {
    let {controller} = this.props;
    if (controller.isAnyImageSelected()) {
      let image = controller.getSelectedImage();
      let {angle} = this.state;
      let rotation = this.getRotationMethod();
      rotation.perform(image, angle);
      image.setNextState();

      controller.updateImageHistogram();
      controller.updateImageCanvas();
      controller.resetActionMethod(undefined);
      controller.updateMethod();
    }
  };

  getRotationMethod = () => {
    return new RawRotation();
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

  render() {
    let {classes} = this.props;
    return(
        <div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Icon style={{padding: "5px"}}>crop_rotate</Icon>
            <Typography
                variant="overline">
              Rotation
            </Typography>
          </div>
          <Divider/>
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