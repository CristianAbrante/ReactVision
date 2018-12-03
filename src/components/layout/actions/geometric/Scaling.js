import React, {Component} from 'react';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/lab/Slider';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import ScalingOperation from '../../../../processor/operations/geometric/Scaling';
import Theme from '../../../theme';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import NearestNeighbourInterpolator
  from '../../../../processor/operations/geometric/interpolator/NearestNeighbourInterpolator';

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

class Scaling extends Component {
  state = {
    inverted: false,
    factor: ScalingOperation.FACTOR_MIN
  };

  applyOperation = () => {
    let {controller} = this.props;
    if (controller.isAnyImageSelected()) {
      let image = controller.getSelectedImage();
      let interpolator = new NearestNeighbourInterpolator();
      let scaling =
          new ScalingOperation(this.getFactor(), this.getFactor());
      scaling.perform(image, interpolator);
      image.setNextState();

      controller.updateImageCanvas();
      controller.resetActionMethod(undefined);
      controller.updateMethod();
    }
  };

  getFactor = () => {
    return this.state.factor;
  };

  onFactorChanged = (event, value) => {
    this.setState({factor: value});
  };

  onFactorTextChanged = event => {
    let factor = Number.parseFloat(event.target.value);
    if (ScalingOperation.factorIsValid(factor)) {
      this.setState({factor: factor});
    }
  };

  invertedChecked = event => {
    this.setState({inverted: event.target.checked});
  };

  render() {
    const {classes} = this.props;
    return(
        <div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Icon style={{padding: "5px"}}>image_aspect_ratio</Icon>
            <Typography
                variant="overline">
              Scaling
            </Typography>
          </div>
          <Divider/>
          <div className={classes.root}>
            <FormControlLabel
                control={
                  <Switch
                      checked={this.state.inverted}
                      onChange={this.invertedChecked}
                      value="checkedA"
                  />
                }
                label="inverse"/>
            <Slider
                classes={
                  { container: classes.slider,
                    track: classes.thumb,
                    thumb: classes.thumb}
                }
                min = {ScalingOperation.FACTOR_MIN}
                max = {ScalingOperation.FACTOR_MAX}
                value={this.state.factor}
                aria-labelledby="label"
                onChange={this.onFactorChanged}
            />
            <TextField
                style={{margin: "15px"}}
                value={this.state.factor}
                type="number"
                margin="normal"
                onChange={this.onFactorTextChanged}
                color="secondary"
            />
          </div>
          <Button
              style={{margin: "10px"}}
              variant="extendedFab"
              color="secondary"
              onClick={this.applyOperation}>
            Apply Scaling
          </Button>
        </div>
    )
  }
}

export default withStyles(styles)(Scaling);