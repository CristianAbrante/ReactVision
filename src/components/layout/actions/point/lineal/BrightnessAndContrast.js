import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/lab/Slider';
import TextField from '@material-ui/core/TextField';
import ProcessImage from '../../../../../processor/image/ProcessImage';
import Theme from '../../../../theme/'
import BrightnessAndContrastOperation from '../../../../../processor/operations/point/lineal/BrightnessAndContrast';
import LookUpTable from '../../../../../processor/operations/point/LookUpTable';

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
    width: '200px',
    margin: 'auto',
    padding: '22px 0px',
  },
  thumb: {
    background: Theme.palette.secondary.main
  }
};

class BrightnessAndContrast extends Component {
  brightnessAndContrast;
  state = {
    brightnessValue: 0.0,
    contrastValue: 0.0
  };

  constructor(props) {
    super(props);
    let controller = this.props.controller;
    this.brightnessAndContrast =
        new BrightnessAndContrastOperation('brightness', 0.0, 0.0);
    let histogram = controller.getCurrentHistogram();
    if (histogram !== undefined) {
      this.state.brightnessValue = histogram.getMean().brightness;
      this.state.contrastValue = histogram.getStdVar().brightness;
    }
  }

  applyOperation = () => {
    let {controller} = this.props;
    if (controller.isAnyImageSelected()) {
      let {brightnessValue, contrastValue} = this.state;
      let histogram = controller.getCurrentHistogram();
      this.brightnessAndContrast.setHistogram(histogram);
      this.brightnessAndContrast.setNewMean(brightnessValue);
      this.brightnessAndContrast.setNewStdVar(contrastValue);
      let lut = new LookUpTable(this.brightnessAndContrast);
      controller.applyPointOperation(lut, 'brightness');
    }
  };

  onBrightnessSliderChange = (event, value) => {
    this.setState({brightnessValue: value});
    this.applyOperation();
  };

  onBrightnessTextFieldChange = event => {
    let value = event.target.value;
    if (value < ProcessImage.MAX_PIXEL_VALUE
        && value >= ProcessImage.MIN_PIXEL_VALUE) {
      this.setState({brightnessValue: Number.parseFloat(event.target.value)});
    }
    this.applyOperation();
  };

  onContrastSliderChange = (event, value) => {
    this.setState({contrastValue: value});
    this.applyOperation();
  };

  onContrastTextFieldChange = event => {
    let value = event.target.value;
    if (value < ProcessImage.MAX_PIXEL_VALUE
        && value >= ProcessImage.MIN_PIXEL_VALUE) {
      this.setState({contrastValue: event.target.value});
    }
    this.applyOperation();
  };

  render() {
    const { classes } = this.props;
    let {brightnessValue, contrastValue} = this.state;
    return(
        <div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Icon style={{padding: "5px"}}>brightness_5</Icon>
            <Typography
              variant="overline">
              Brightness and contrast
            </Typography>
          </div>
          <Divider/>
          <div>
            <div className={classes.root}>
              <Typography
                  id="label"
                  style={{padding: "15px"}}>
                Brightness
              </Typography>
              <Slider
                  classes={
                    { container: classes.slider,
                      track: classes.thumb,
                      thumb: classes.thumb}
                  }
                  min = {ProcessImage.MIN_PIXEL_VALUE}
                  max = {ProcessImage.MAX_PIXEL_VALUE - 1}
                  value={brightnessValue}
                  aria-labelledby="label"
                  onChange={this.onBrightnessSliderChange}
              />
              <TextField
                  style={{margin: "15px"}}
                  id="standard-number"
                  value={brightnessValue}
                  type="number"
                  className={classes.textField}
                  max={255}
                  margin="normal"
                  onChange={this.onBrightnessTextFieldChange}
                  color="secondary"
              />
            </div>
            <div className={classes.root}>
              <Typography
                  id="label"
                  style={{padding: "15px"}}>
                Contrast
              </Typography>
              <Slider
                  classes={
                    { container: classes.slider,
                      track: classes.thumb,
                      thumb: classes.thumb}
                  }
                  min = {ProcessImage.MIN_PIXEL_VALUE}
                  max = {ProcessImage.MAX_PIXEL_VALUE - 1}
                  value={contrastValue}
                  aria-labelledby="label"
                  onChange={this.onContrastSliderChange}
              />
              <TextField
                  style={{margin: "15px"}}
                  id="standard-number"
                  value={contrastValue}
                  type="number"
                  className={classes.textField}
                  max={255}
                  margin="normal"
                  onChange={this.onContrastTextFieldChange}
                  color="secondary"
              />
            </div>
          </div>
        </div>
    );
  }
}

export default withStyles(styles)(BrightnessAndContrast);