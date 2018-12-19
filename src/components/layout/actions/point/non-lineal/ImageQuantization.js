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
import Theme from '../../../../theme';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';

import BlackAndWhiteOperation from '../../../../../processor/operations/point/lineal/BlackAndWhite';
import ImageQuantizer from '../../../../../processor/operations/point/non-lineal/ImageQuantizer';
import ImageResampler from '../../../../../processor/operations/point/non-lineal/ImageResampler';
import ProcessImage from '../../../../../processor/image/ProcessImage';

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

class ImageQuantization extends Component {
  state = {
    quantizationLevel: 8,
    resampleRows: 1,
    resampleCols: 1,
  };

  constructor(props) {
    super(props);
  }

  applyOperation = () => {
    let {controller} = this.props;

    if (controller.isAnyImageSelected()) {
      controller.getSelectedImage().createNewState();
      controller.getSelectedImage().setNextState();

      ImageResampler.resample(controller.getSelectedImage(), this.state.resampleRows, this.state.resampleCols);
      ImageQuantizer.quantizeImage(controller.getSelectedImage(), this.state.quantizationLevel);

      controller.updateImageHistogram();
      controller.updateImageCanvas();
      controller.updateMethod();
    }
  };

  onQuantizationLevelChange = (event, value) => {
    this.setState({quantizationLevel: value});
  };

  onQuantizationLevelTextChange = event => {
    let value = Number.parseInt(event.target.value);
    if (value > ProcessImage.MIN_PIXEL_VALUE && value <= Math.log2(ProcessImage.MAX_PIXEL_VALUE)){
      this.setState({quantizationLevel: value});
    }
  };

  onResampleSizeChange = event => {
    let value = Number.parseInt(event.target.value);
    let selectedImage = this.props.controller.getSelectedImage();

    if (value > 0 && value <= Math.min(selectedImage.getWidth(), selectedImage.getHeight())){
      this.setState({[event.target.name]: value});
    }
  };

  render() {
    const { classes } = this.props;
    const { controller } = this.props;
    return(
      <div>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Icon style={{padding: "5px"}}>image_aspect_ratio</Icon>
        <Typography
            variant="overline">
          Quantizer
        </Typography>

      </div>
        <Divider/>
        <div style={{width: '180px', margin: 'auto'}}>
          <Slider
          classes={
            { container: classes.slider,
              track: classes.thumb,
              thumb: classes.thumb}
          }
          value={this.state.quantizationLevel}
          min={ProcessImage.MIN_PIXEL_VALUE + 1}
          max={Math.log2(ProcessImage.MAX_PIXEL_VALUE)}
          step={1}
          onChange={this.onQuantizationLevelChange}
        />
          <TextField
              style={{margin: "15px"}}
              value={this.state.quantizationLevel}
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="start">bits</InputAdornment>,
              }}
              onChange={this.onQuantizationLevelTextChange}
              color="secondary"
          />
          <TextField
              name = "resampleRows"
              style={{margin: "15px"}}
              value={this.state.resampleRows}
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="start">rows</InputAdornment>,
              }}
              onChange={this.onResampleSizeChange}
              color="secondary"
          />
          <TextField
              name = "resampleCols"
              style={{margin: "15px"}}
              value={this.state.resampleCols}
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="start">columns</InputAdornment>,
              }}
              onChange={this.onResampleSizeChange}
              color="secondary"
          />
          <Button
              style={{margin: "10px"}}
              variant="extendedFab"
              color="secondary"
              onClick={this.applyOperation}>
            Apply quantization
          </Button>
        </div>
      </div>
    );
  }
}

ImageQuantization.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageQuantization);
