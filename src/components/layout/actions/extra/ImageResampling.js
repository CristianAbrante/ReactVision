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
import Slider from '@material-ui/lab/Slider/Slider';
import TextField from '@material-ui/core/TextField/TextField';
import Theme from '../../../theme';
import Icon from '@material-ui/core/Icon';

import LookUpTable from '../../../../processor/operations/point/LookUpTable';
import BlackAndWhiteOperation from '../../../../processor/operations/point/lineal/BlackAndWhite';
import ImageResampler from '../../../../processor/operations/extra/ImageResampler';
import ProcessImage from '../../../../processor/image/ProcessImage';

//import VerticalProcessor from '../../../../processor/operations/geometric/VerticalFlipProcessor';
//import HorizontalProcessor from '../../../../processor/operations/geometric/HorizontalFlipProcessor';

const styles = {
  root: {
    width: 400,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "space-between",
    margin: "auto"
  },
  slider: {
    padding: '22px 0px',
    margin: 'auto',

  },
  thumb: {
    background: Theme.palette.secondary.main
  },
  formControl: {
    margin: Theme.spacing.unit,
    minWidth: 120,
  },
};

class ImageResampling extends Component {
  state = {
    resampleSize: 2,
  };

  constructor(props) {
    super(props);
  }

  applyOperation = () => {
    let {controller} = this.props;

    if (controller.isAnyImageSelected()) {
      controller.getSelectedImage().createNewState();
      controller.getSelectedImage().setNextState();

      ImageResampler.resample(controller.getSelectedImage(), this.state.resampleSize);

      controller.updateImageHistogram();
      controller.updateImageCanvas();
      controller.updateMethod();
    }
  };

  onSliderResampleChange = (event, value) => {
    this.setState({resampleSize: value});
  };

  onTextResampleChange = event => {
    let value = Number.parseInt(event.target.value);

    if (value <= ImageResampler.MIN_VALUE){
      this.setState({resampleSize: ImageResampler.MIN_VALUE});
    } else if (value >= ImageResampler.MAX_VALUE){
      this.setState({resampleSize: ImageResampler.MAX_VALUE});
    } else {
      this.setState({resampleSize: value});
    }


  };

  render() {
    const { classes } = this.props;

    return(
      <div>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Icon style={{padding: "5px"}}>image_aspect_ratio</Icon>
        <Typography
            variant="overline">
          Resample
        </Typography>

      </div>
        <Divider/>
        <Button
            variant="fab"
            color="secondary"
            aria-label="Add"
            onClick={this.applyOperation}>
          <AddIcon />
        </Button>
        <div style={{width: '180px', margin: 'auto'}}>
          <Typography variant="caption" style={{margin: 10}}>Resample</Typography>
          <Slider
          classes={
            { container: classes.slider,
              track: classes.thumb,
              thumb: classes.thumb}
          }
          value={this.state.resampleSize}
          min={ImageResampler.MIN_VALUE}
          max={ImageResampler.MAX_VALUE}
          step={1}
          onChange={this.onSliderResampleChange}
        />
          <TextField
              style={{margin: "15px"}}
              value={this.state.resampleSize}
              type="number"
              margin="normal"
              onChange={this.onTextResampleChange}
              color="secondary"
          />
        </div>
      </div>
    );
  }
}

ImageResampling.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageResampling);
