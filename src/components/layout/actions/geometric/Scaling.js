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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import NearestNeighbourInterpolator
  from '../../../../processor/operations/geometric/interpolator/NearestNeighbourInterpolator';
import BilinealInterpolator
  from '../../../../processor/operations/geometric/interpolator/BilinealInterpolator';

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

const interpolators = {
  nearestNeighbour: new NearestNeighbourInterpolator(),
  bilineal: new BilinealInterpolator(),
};

class Scaling extends Component {
  interpolatorsText = ['nearestNeighbour', 'bilineal'];

  state = {
    xFactor: ScalingOperation.FACTOR_MIN,
    yFactor: ScalingOperation.FACTOR_MIN,
    selectedInterpolator: this.interpolatorsText[0]
  };

  getSelectedInterpolator = () => {
    return interpolators[this.state.selectedInterpolator];
  };

  applyOperation = () => {
    let {controller} = this.props;
    if (controller.isAnyImageSelected()) {
      let image = controller.getSelectedImage();
      let interpolator = this.getSelectedInterpolator();
      let factor = this.getFactor();
      let scaling =
          new ScalingOperation(factor.x, factor.y);
      scaling.perform(image, interpolator);
      image.setNextState();

      controller.updateImageCanvas();
      controller.resetActionMethod(undefined);
      controller.updateMethod();
    }
  };

  getFactor = () => {
    return {
      x: this.state.xFactor,
      y: this.state.yFactor,
    }
  };

  onFactorChanged = name => (event, value) => {
    this.setState({[name]: value});
  };

  onFactorTextChanged = name => event => {
    let factor = Number.parseFloat(event.target.value);
    if (ScalingOperation.factorIsValid(factor)) {
      this.setState({[name]: factor});
    }
  };

  onInterpolatorSelected = event => {
    this.setState({selectedInterpolator: event.target.value})
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
          <FormControl className={classes.formControl}>
            <Select
                value={this.state.selectedInterpolator}
                onChange={this.onInterpolatorSelected}
                autoWidth
            >
              {this.interpolatorsText.map(interpolatorName => {
                return <MenuItem
                    key={interpolatorName}
                    value={interpolatorName}>{interpolatorName}</MenuItem>;
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
                min = {ScalingOperation.FACTOR_MIN}
                max = {ScalingOperation.FACTOR_MAX}
                value={this.state.xFactor}
                aria-labelledby="label"
                onChange={this.onFactorChanged('xFactor')}
            />
            <TextField
                style={{margin: "15px"}}
                value={this.state.xFactor}
                type="number"
                margin="normal"
                onChange={this.onFactorTextChanged('xFactor')}
                color="secondary"
            />
          </div>
          <div className={classes.root}>
            <Typography variant="caption" style={{margin: 10}}>Vertical factor</Typography>
            <Slider
                classes={
                  { container: classes.slider,
                    track: classes.thumb,
                    thumb: classes.thumb}
                }
                min = {ScalingOperation.FACTOR_MIN}
                max = {ScalingOperation.FACTOR_MAX}
                value={this.state.yFactor}
                aria-labelledby="label"
                onChange={this.onFactorChanged('yFactor')}
            />
            <TextField
                style={{margin: "15px"}}
                value={this.state.yFactor}
                type="number"
                margin="normal"
                onChange={this.onFactorTextChanged('yFactor')}
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