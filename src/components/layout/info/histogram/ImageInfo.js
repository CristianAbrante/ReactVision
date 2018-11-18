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
    margin: theme.spacing.unit / 2,
  },
});

class ImageInfo extends Component {
  getElement = property => {
    let histogram = this.props.histogram;
    if (histogram === undefined) {
      return "-";
    } else {
      let value = histogram[property]();
      return value % 1 === 0 ? value : value.toFixed(3);
    }
  };

  render () {
    const {classes} = this.props;
    return (
        <div className={classes.root}>
          <Chip
              label={"count: " + this.getElement("getNumberOfPixels")}
              color="secondary"
              className={classes.chip}/>
          <Chip
              label={"brightness: " + this.getElement("getMean")}
              color="secondary"
              className={classes.chip}/>
          <Chip
              label={"contrast: " + this.getElement("getStdVar")}
              color="secondary"
              className={classes.chip}/>
          <Chip
              label={"min: " + this.getElement("getMin")}
              color="secondary"
              className={classes.chip}/>
          <Chip
              label={"max: " + this.getElement("getMax")}
              color="secondary"
              className={classes.chip}/>
        </div>
    );
  }
}

export default withStyles(styles)(ImageInfo);