import React, {Component} from 'react';
import {
  AreaSeries,
  XYPlot,
  FlexibleXYPlot,
  makeWidthFlexible,
  XAxis,
  YAxis,
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
  state = {
    emphasizedValue: null,
    histogramVisualizationData: []
  };


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
      <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
        width: "100%",
        height: "180px"
      }}
    >
          <FlexibleXYPlot margin={{
          top: 10,
          left: 70
        }}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            {this.getSeries('r')}
            {this.getSeries('g')}
            {this.getSeries('b')}
            {this.getSeries('brightness')}
          </FlexibleXYPlot>
          </div>
    );
  }
}

export default HistogramGraph;
