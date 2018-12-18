import React, {Component} from 'react';
import {
  LineSeries,
  FlexibleWidthXYPlot,
  XAxis,
  VerticalGridLines,
  HorizontalGridLines,
} from 'react-vis';
import Theme from '../../../../../theme';

function CrossImageGraph(props) {
  return(
      <FlexibleWidthXYPlot
          height={180}
          margin={{left: 10, right: 10, top: 10, bottom: 40}}
          stackBy="y">
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis hideLine/>
        <LineSeries
            data={props.data}
            color={Theme.palette.secondary.main}/>
      </FlexibleWidthXYPlot>
  );
}

export default CrossImageGraph;