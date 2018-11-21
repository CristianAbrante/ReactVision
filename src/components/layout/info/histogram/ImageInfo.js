import React, {Component} from 'react';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

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
  getImageProperty = property => {
    let histogram = this.props.histogram;
    if (histogram === undefined) {
      return "-";
    } else {
      return histogram.getImage()[property]();
    }
  };

  getHistogramProperty = property => {
    let histogram = this.props.histogram;
    if (histogram === undefined) {
      return "-";
    } else {
      // TODO: Implementing for different components.
      let value = histogram[property]().brightness;
      return value % 1 === 0 ? value : value.toFixed(3);
    }
  };

  render () {
    const {classes} = this.props;
    return (
        <div>
          <div className={classes.root}>
            <Chip
                label={"format: " + this.getImageProperty("getFormat")}
                color="secondary"
                className={classes.chip}/>
            <Chip
                label={"count: " + this.getImageProperty("getNumberOfPixels")}
                color="secondary"
                className={classes.chip}/>
            <Chip
                label={"width: " + this.getImageProperty("getWidth")}
                color="secondary"
                className={classes.chip}/>
            <Chip
                label={"height: " + this.getImageProperty("getHeight")}
                color="secondary"
                className={classes.chip}/>
          </div>
          <div className={classes.root}>
            <Chip
                label={"brightness: " + this.getHistogramProperty("getMean")}
                color="primary"
                className={classes.chip}/>
            <Chip
                label={"contrast: " + this.getHistogramProperty("getStdVar")}
                color="primary"
                className={classes.chip}/>
            <Chip
                label={"entropy: " + this.getHistogramProperty("getEntropy")}
                color="primary"
                className={classes.chip}/>
          </div>
          <div className={classes.root}>
            <Chip
                label={"min: " + this.getHistogramProperty("getMin")}
                color="secondary"
                className={classes.chip}/>
            <Chip
                label={"max: " + this.getHistogramProperty("getMax")}
                color="secondary"
                className={classes.chip}/>
          </div>
        </div>
    );
  }
}

export default withStyles(styles)(ImageInfo);