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
  blue: "#1976d2"
};

class HistogramGraph extends Component {
  getSeriesToDisplay = () => {
    let displayRed = this.props.red;
    let displayGreen = this.props.green;
    let displayBlue = this.props.blue;
    let accumulative = this.props.accumulative;

    return (
        <div>
          {this.getRedSeries(accumulative)}
        </div>
    );
  };

  getRedSeries = accumulative => {
    let rData = this.props.currentHistogram.getRedData(accumulative);
    return(
        <AreaSeries
            curve="curve-natural"
            color={colors.red}
            opacity="0.2"
            data={rData} />
    );
  };

  render() {
    return (
        <div>
          <FlexibleWidthXYPlot
              onMouseLeave={this._onMouseLeave}
              height={200}
              margin={{left: 10, right: 10, top: 10, bottom: 40}}
              stackBy="y">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis hideLine tickValues={[0, 50, 100, 150, 200, 250]}/>
            {this.getSeriesToDisplay()}
          </FlexibleWidthXYPlot>
        </div>
    );
  }
}

export default HistogramGraph;