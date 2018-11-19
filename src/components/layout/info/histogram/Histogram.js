import React, {Component} from 'react';
import {
  AreaSeries,
  FlexibleWidthXYPlot,
  XAxis,
  VerticalGridLines,
  HorizontalGridLines,
} from 'react-vis';

const colors = {
  red: "#d32f2f",
  green: "#43a047",
  blue: "#1976d2",
  grey: "#bdbdbd"
};

class HistogramGraph extends Component {
  getRedSeries = () => {
    if (this.props.brightness) {
      return null;
    }
    let accumulative = this.props.accumulative;
    let displayRed = this.props.red;
    if (displayRed) {
      let rData = this.props.currentHistogram.getRedData(accumulative);
      return this.getDataSeries(rData, colors.red);
    } else {
      return null;
    }
  };

  getGreenSeries = () => {
    if (this.props.brightness) {
      return null;
    }
    let accumulative = this.props.accumulative;
    let displayGreen = this.props.green;
    if (displayGreen) {
      let gData = this.props.currentHistogram.getGreenData(accumulative);
      return this.getDataSeries(gData, colors.green);
    } else {
      return null;
    }
  };

  getBlueSeries = () => {
    if (this.props.brightness) {
      return null;
    }
    let accumulative = this.props.accumulative;
    let displayBlue = this.props.blue;
    if (displayBlue) {
      let bData = this.props.currentHistogram.getBlueData(accumulative);
      return this.getDataSeries(bData, colors.blue);
    } else {
      return null;
    }
  };

  getBrightnessSeries = () => {
    if (this.props.brightness) {
      let accumulative = this.props.accumulative;
      let data = this.props.currentHistogram.getBrightnessData(accumulative);
      console.log(data);
      return this.getDataSeries(data, colors.grey);
    } else {
      return null;
    }
  };

  getDataSeries = (data, color) => {
    return(
        <AreaSeries
            curve="curve-natural"
            color={color}
            opacity="0.2"
            data={data} />
    );
  };

  render() {
    return (
        <div>
          <FlexibleWidthXYPlot
              onMouseLeave={this._onMouseLeave}
              height={180}
              margin={{left: 10, right: 10, top: 10, bottom: 40}}
              stackBy="y">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis hideLine tickValues={[0, 50, 100, 150, 200, 250]}/>
            {this.getRedSeries()}
            {this.getGreenSeries()}
            {this.getBlueSeries()}
            {this.getBrightnessSeries()}
          </FlexibleWidthXYPlot>
        </div>
    );
  }
}

export default HistogramGraph;