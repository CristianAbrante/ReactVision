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

  getFormat = () => {
    let histogram = this.props.histogram;
    if (histogram === undefined) {
      return "-";
    } else {
      return histogram.getFormat();
    }
  };

  getElement = property => {
    let histogram = this.props.histogram;
    if (histogram === undefined) {
      return "-";
    } else {
      let value = histogram[property]();
      console.log(value);
      return value % 1 === 0 ? value : value.toFixed(3);
    }
  };

  render () {
    const {classes} = this.props;
    return (
        <div>
          <div className={classes.root}>
            <Chip
                label={"format: " + this.getFormat()}
                color="secondary"
                className={classes.chip}/>
            <Chip
                label={"count: " + this.getElement("getNumberOfPixels")}
                color="secondary"
                className={classes.chip}/>
            <Chip
                label={"width: " + this.getElement("getWidth")}
                color="secondary"
                className={classes.chip}/>
            <Chip
                label={"height: " + this.getElement("getHeight")}
                color="secondary"
                className={classes.chip}/>
          </div>
          <div className={classes.root}>
            <Chip
                label={"brightness: " + this.getElement("getMean")}
                color="primary"
                className={classes.chip}/>
            <Chip
                label={"contrast: " + this.getElement("getStdVar")}
                color="primary"
                className={classes.chip}/>
            <Chip
                label={"entropy: " + this.getElement("getEntropy")}
                color="primary"
                className={classes.chip}/>
          </div>
          <div className={classes.root}>
            <Chip
                label={"min: " + this.getElement("getMin")}
                color="secondary"
                className={classes.chip}/>
            <Chip
                label={"max: " + this.getElement("getMax")}
                color="secondary"
                className={classes.chip}/>
          </div>
        </div>
    );
  }
}

export default withStyles(styles)(ImageInfo);