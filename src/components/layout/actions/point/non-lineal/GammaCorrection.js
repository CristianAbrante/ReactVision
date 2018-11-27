import React, {Component} from 'react';
import Icon from '@material-ui/core/Icon/Icon';
import Typography from '@material-ui/core/Typography/Typography';
import Divider from '@material-ui/core/Divider/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ProcessImage from '../../../../../processor/image/ProcessImage';
import Slider from '@material-ui/lab/Slider/Slider';
import Theme from '../../../../theme';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField/TextField';
import {
  HorizontalGridLines, LineSeries,
  VerticalGridLines,
  XAxis,
  XYPlot, YAxis,
} from 'react-vis/es';

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

const MIN_GAMMA = 1.0;
const MAX_GAMMA = 100.0;

class GammaCorrection extends Component {
  state = {
    inverted: false,
    gamma: MIN_GAMMA
  };

  getGammaData = () => {
    const interval = 0.01;
    const intervalMax = 1.0;

    let data = [];
    for (let i = 0.0; i < intervalMax; i += interval) {
      data.push({x: i, y: Math.pow(i, this.getGammaValue())});
    }
    return data;
  };

  invertedChecked = event => {
    this.setState({inverted: event.target.checked});
  };

  getGammaValue = () => {
    if (this.state.inverted) {
      return 1 / this.state.gamma;
    } else {
      return this.state.gamma;
    }
  };

  onGammaChange = (event, value) => {
    this.setState({gamma: value});
  };

  onGammaTextChange = event => {
    let value = Number.parseFloat(event.target.value);
    if (value >= MIN_GAMMA && value <= MAX_GAMMA) {
      this.setState({gamma: value});
    }
  };

  render() {
    const { classes } = this.props;
    return (
        <div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Icon style={{padding: "5px"}}>desktop_windows</Icon>
            <Typography
                variant="overline">
              Gamma correction
            </Typography>
          </div>
          <Divider/>
          <div style={{display:"flex", justifyContent: "center", width: "100%"}}>
            <XYPlot width={200} height={200}>
              <HorizontalGridLines />
              <VerticalGridLines />
              <XAxis />
              <YAxis />
              <LineSeries
                  curve={'curveMonotoneX'}
                  color={Theme.palette.secondary.main}
                  data={this.getGammaData()}
              />
            </XYPlot>
          </div>
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
                min = {MIN_GAMMA}
                max = {MAX_GAMMA}
                value={this.state.gamma}
                aria-labelledby="label"
                onChange={this.onGammaChange}
            />
            <TextField
                style={{margin: "15px"}}
                value={this.state.gamma}
                type="number"
                margin="normal"
                onChange={this.onGammaTextChange}
                color="secondary"
            />
          </div>
        </div>
    )
  }
}

export default withStyles(styles)(GammaCorrection);