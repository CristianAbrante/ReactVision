import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/es/Divider/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import VerticalProcessor from '../../../../processor/image/operations/VerticalFlipProcessor';
import HorizontalProcessor from '../../../../processor/image/operations/HorizontalFlipProcessor';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    width: 100,
  },

  button: {
    margin: theme.spacing.unit
  }
});

class ImageFlipper extends Component {
  state = {
    flipType: "",
    labelWidth: 0,
  };

  constructor(props) {
    super(props);
  }

  applyOperation = () => {
    let {controller} = this.props;

    if(this.state.flipType === "vertical") {
      VerticalProcessor.getGeometricChange(controller.getSelectedImage());
    } else {
      HorizontalProcessor.getGeometricChange(controller.getSelectedImage());
    }

    controller.updateImageHistogram();
    controller.updateImageCanvas();
    controller.updateMethod();
  };

  handleFormChange= event => {
   this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return(
      <div>
      <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-flipType-simple"
          >
            Flyp type
          </InputLabel>
          <Select
            value={this.state.flipType}
            onChange={this.handleFormChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="flipType"
                id="outlined-flipType-simple"
              />
            }
          >
          <MenuItem key="horizontal" value="horizontal">Horizontal</MenuItem>
          <MenuItem key="vertical" value="vertical">Vertical</MenuItem>
          </Select>
        </FormControl>
        <Button
            variant="fab"
            color="secondary"
            aria-label="Add"
            onClick={this.applyOperation}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}

ImageFlipper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageFlipper);
