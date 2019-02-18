import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Theme from '../../../../theme';
import ProcessImage from '../../../../../processor/image/ProcessImage';

import {
  LineSeries,
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
} from 'react-vis';

import LinealPicewiseAdjustmentOperation from '../../../../../processor/operations/point/lineal/LinealPicewiseAdjustment';
import LookUpTable from '../../../../../processor/operations/point/LookUpTable';

const MAX_POINTS = 12;

class LinealPicewiseAdjustment extends Component {
  operationHasBeenApplied = false;
  state = {
    x: 0.0,
    y: 0.0,
    linealPicewiseOperation: null,
    maxPointsReached: false
  };

  constructor(props) {
    super(props);
    this.state.linealPicewiseOperation =
        new LinealPicewiseAdjustmentOperation();
    this.applyOperation();
  }

  applyOperation = () => {
    let {controller} = this.props;
    if (controller.isAnyImageSelected()) {
      if (!this.operationHasBeenApplied) {
        let image = controller.getSelectedImage();
        image.createNewState();
        image.setNextState();
        this.operationHasBeenApplied = true;
      }
      let lut = new LookUpTable(this.state.linealPicewiseOperation);
      controller.applyPointOperation(lut, 'brightness');
    }
  };

  onChipDelete = point => () => {
    console.log(point.x + " " + point.y);
  };

  updateState = () => {
    this.setState({linealPicewiseOperator: this.state.linealPicewiseOperation});
  };

  onInsertionValueChanged = component => event => {
    let value = event.target.value;
    if (value >= ProcessImage.MIN_PIXEL_VALUE
        && value < ProcessImage.MAX_PIXEL_VALUE) {
      this.setState({[component]: value});
    }
  };

  addPoint = () => {
    let {x, y, linealPicewiseOperation} = this.state;
    x = Number.parseFloat(x);
    y = Number.parseFloat(y);
    if ((typeof x) !== 'string' && (typeof y) !== 'string') {
      linealPicewiseOperation.insert({x: x, y: y});
      if (linealPicewiseOperation.points.length === MAX_POINTS) {
        this.setState({maxPointsReached: true});
      }
      this.updateState();
      this.applyOperation();
    }
  };

  render() {
    let points = this.state.linealPicewiseOperation.points;
    return (
        <div>
          <div style={{display:"flex", justifyContent: "center", width: "100%"}}>
            <XYPlot width={200} height={200}>
              <HorizontalGridLines />
              <VerticalGridLines />
              <XAxis />
              <YAxis />
              <LineSeries
                  color={Theme.palette.secondary.main}
                  data={points}
              />
            </XYPlot>
          </div>
          <div>
            {points.map((point) => {
              return (<Chip
                        key={"x: " + point.x + " y: " + point.y}
                        style={{margin: "5px"}}
                        label={"x: " + point.x + " y: " + point.y}
                        color="secondary"
                        variant="outlined"
                      />);
            })}
          </div>
          <div>
            <TextField
                style={{margin: "15px"}}
                label="X"
                value={this.state.x}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                onChange={this.onInsertionValueChanged('x')}
            />
            <TextField
                style={{margin: "15px"}}
                label="Y"
                value={this.state.y}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                onChange={this.onInsertionValueChanged('y')}
            />
          </div>
          <div>
            <Button
                mini
                variant="fab"
                color="secondary"
                aria-label="Add"
                onClick={this.addPoint}
                disabled={this.state.maxPointsReached}>
              <AddIcon />
            </Button>
          </div>
        </div>
    );
  }
}

export default LinealPicewiseAdjustment;
