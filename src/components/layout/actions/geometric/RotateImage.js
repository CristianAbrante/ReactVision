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

import ImageRotation from '../../../../processor/operations/geometric/ImageRotation';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    width: 100,
  },

  button: {
    margin: theme.spacing.unit
  }
});

class RotateImage extends Component {
  state = {
    rotationDegrees: "",
    labelWidth: 0,
  };

  constructor(props) {
    super(props);
  }

  applyOperation = () => {
    let selectedImage = this.props.controller.getSelectedImage();

    ImageRotation.applyGeometricChange(selectedImage, this.state.rotationDegrees);
    this.props.controller.updateImageHistogram();
    this.props.controller.updateImageCanvas();
    this.props.controller.updateMethod();
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
            htmlFor="outlined-rotationDegrees-simple"
          >
            Degrees
          </InputLabel>
          <Select
            value={this.state.rotationDegrees}
            onChange={this.handleFormChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="rotationDegrees"
                id="outlined-rotationDegrees-simple"
              />
            }
          >
          <MenuItem key="0" value="0">0º</MenuItem>
          <MenuItem key="90" value="90">90º</MenuItem>
          <MenuItem key="180" value="180">180º</MenuItem>
          <MenuItem key="270" value="270">270º</MenuItem>
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

RotateImage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RotateImage);
