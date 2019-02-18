import React, {Component} from 'react';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});


class ImageInfo extends Component {
  state = {
    rows: [
        { variable: "Number of pixel", value: "-"},
        { variable: "Image width", value: "-"},
        { variable: "Image height", value: "-"},
        { variable: "Brightness", value: "-"},
        { variable: "Contrast", value: "-"},
        { variable: "Entropy", value: "-"},
        { variable: "Min value", value: "-"},
        { variable: "Max value", value: "-"}
    ],
  };

  getImageProperty = property => {
    let histogram = this.props.histogram;

    return histogram.getImage()[property]();
  };

  getHistogramProperty = property => {
    let histogram = this.props.histogram;

    let value = histogram[property]().brightness;
    return value % 1 === 0 ? value : value.toFixed(3);
  };

  shouldComponentUpdate(nextProps) {
    let histogram = this.props.histogram;

    if(histogram === undefined || nextProps.histogram === undefined){
      this.state.rows = [{ variable: "Number of pixel", value: "-"},
      { variable: "Image width", value: "-"},
      { variable: "Image height", value: "-"},
      { variable: "Brightness", value: "-"},
      { variable: "Contrast", value: "-"},
      { variable: "Entropy", value: "-"},
      { variable: "Min value", value: "-"},
      { variable: "Max value", value: "-"}]
      return true;
    }

    this.state.rows = [
    { variable: "Number of pixel", value: this.getImageProperty("getNumberOfPixels")},
    { variable: "Image width", value: this.getImageProperty("getWidth")},
    { variable: "Image height", value: this.getImageProperty("getHeight")},
    { variable: "Brightness", value: this.getHistogramProperty("getMean")},
    { variable: "Contrast", value: this.getHistogramProperty("getStdVar")},
    { variable: "Entropy", value: this.getHistogramProperty("getEntropy")},
    { variable: "Min value", value: this.getHistogramProperty("getMin")},
    { variable: "Max value", value: this.getHistogramProperty("getMax")}
  ];
    return true;
  }

  render () {
    const {classes} = this.props;
    const {rows} = this.state;

    return (
      <div className="column" id="info">
          <div className="column left">
          <Table padding="dense">
          <TableHead>
            <TableRow>
              <TableCell>Variable</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(0, rows.length/2).map((row, id) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {row.variable}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>

        <div className="column right">
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Variable</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice((rows.length/2), rows.length).map((row, id) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {row.variable}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
        </div>
    </div>
    );
  }
}

export default withStyles(styles)(ImageInfo);
