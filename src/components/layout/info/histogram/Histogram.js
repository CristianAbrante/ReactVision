import React, {Component} from 'react';
import {
  AreaSeries,
  FlexibleWidthXYPlot,
  XAxis,
  VerticalGridLines,
  HorizontalGridLines,
} from 'react-vis';

const colors = {
  r: "#d32f2f",
  g: "#43a047",
  b: "#1976d2",
  brightness: "#bdbdbd"
};

class HistogramGraph extends Component {

  getSeries = component => {
    let accumulative = this.props.accumulative;
    let histogram = this.props.currentHistogram;
    if (component === 'brightness') {
      if (!this.props.brightness)
        return null;

      let data = histogram.getFormattedData(component, accumulative);
      return this.getDataSeries(data, colors[component]);
    } else {
      if (this.props.brightness)
        return null;
      if (this.props[component]) {
        let data = histogram.getFormattedData(component, accumulative);
        return this.getDataSeries(data, colors[component]);
      } else {
        return null;
      }
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
            {this.getSeries('r')}
            {this.getSeries('g')}
            {this.getSeries('b')}
            {this.getSeries('brightness')}
          </FlexibleWidthXYPlot>
        </div>
    );
  }
}

export default HistogramGraph;