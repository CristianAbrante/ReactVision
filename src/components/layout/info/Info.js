import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import HistogramInfo from './histogram/HistogramInfo';
import Histogram from './histogram/Histogram';
import ImageInfo from './histogram/ImageInfo';
import theme from '../../theme/';

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  alignContent: "stretch"
};

class Info extends Component {
  state = {
    accumulative: false,
    red: true,
    green: true,
    blue: true,
    disableColors: false
  };

  renderHistogram = () => {
    let histogram = this.props.controller.getCurrentHistogram();
    if (histogram === undefined) {
      return (
          <div
              style={{height: "180px", background: theme.palette.primary.main, margin: "10px 10px 30px"}}>

          </div>
      )
    } else {
      return (
          <div style={{padding: "20px"}}>
            <Histogram
                accumulative = {this.state.accumulative}
                brightness = {this.state.disableColors}
                r = {this.state.red}
                g = {this.state.green}
                b = {this.state.blue}
                currentHistogram={histogram} />
          </div>);
    }
  };

  handleBrightnessVisualization = () => {
    this.setState({disableColors: !this.state.disableColors});
  };

  handleHistogramVisualization = () => {
    this.setState({accumulative: !this.state.accumulative});
  };

  handleColorsVisualization = component => event => {
    this.setState({[component]: event.target.checked});
  };

  render() {
    let histogram = this.props.controller.getCurrentHistogram();
    return(
        <Paper
          style={{height: "100%"}}>
          <HistogramInfo
              options={this.state}
              onHistogramOption={this.handleHistogramVisualization}
              onColorOptions={this.handleColorsVisualization}
              onBrightnessOption={this.handleBrightnessVisualization}/>
          {this.renderHistogram()}
          <ImageInfo
              histogram={histogram}/>
        </Paper>
    )
  }
}

export default Info;