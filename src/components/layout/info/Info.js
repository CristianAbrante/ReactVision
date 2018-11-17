import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import HistogramInfo from './histogram/HistogramInfo';
import Histogram from './histogram/Histogram';

class Info extends Component {
  state = {
    accumulative: false,
    red: true,
    green: false,
    blue: false
  };

  renderHistogram = () => {
    let histogram = this.props.controller.getCurrentHistogram();
    if (histogram === undefined) {
      return <Typography>Open an image</Typography>
    } else {
      return (
          <div style={{padding: "20px"}}>
            <Histogram
                accumulative={this.state.accumulative}
                red = {this.state.red}
                green = {this.state.green}
                blue = {this.state.blue}
                currentHistogram={histogram} />
          </div>);
    }
  };

  handleHistogramVisualization = () =>{
    this.setState({accumulative: !this.state.accumulative});
  };

  handleColorsVisualization = component => event => {
    //let componentValue = this.state[component];
    this.setState({[component]: event.target.checked});
    console.log(this.state);
  };

  render() {
    const {red, green, blue} = this.state;

    return(
        <Paper
          style={{height: "100%"}}>
          <HistogramInfo
              options={this.state}
              onHistogramOption={this.handleHistogramVisualization}
              onColorOptions={this.handleColorsVisualization} />
          {this.renderHistogram()}
        </Paper>
    )
  }
}

export default Info;