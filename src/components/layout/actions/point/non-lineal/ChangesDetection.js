import React, {Component} from 'react';
import Icon from '@material-ui/core/Icon/Icon';
import Typography from '@material-ui/core/Typography/Typography';
import Divider from '@material-ui/core/Divider/Divider';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Theme from '../../../../theme';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core/styles';
import ErrorHandler from '../../../error/ErrorHandler';
import ChangesDetectionOperation
  from '../../../../../processor/operations/point/non-lineal/ChangesDetection';
import Slider from '@material-ui/lab/Slider/Slider';
import TextField from '@material-ui/core/TextField/TextField';
import ProcessImage from '../../../../../processor/image/ProcessImage';

const styles = {
  root: {
    width: 420,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "space-between",
    margin: "auto"
  },
  slider: {
    width: '150px',
    margin: 'auto',
  },
  thumb: {
    background: Theme.palette.secondary.main
  }
};

const MIN_THRESHOLD = ProcessImage.MIN_PIXEL_VALUE;
const MAX_THRESHOLD = ProcessImage.MAX_PIXEL_VALUE - 1;

class ChangesDetection extends Component {

  state = {
    imageTitle: "",
    referenceImage: undefined,
    error: false,
    errorMsg: '',
    threshold: 0.0
  };

  applyOperation = () => {
    let {controller} = this.props;
    let {referenceImage} = this.state;
    if (controller.isAnyImageSelected()) {
      if (referenceImage !== undefined) {
        let operation = new ChangesDetectionOperation(this.state.threshold);
        let selectedImage = controller.getSelectedImage();
        try {
          operation.perform(selectedImage, referenceImage);
          controller.add(operation.resultImage);
        }
        catch (e) {
          this.setState({error: true, errorMsg: e.message});
        }
      }
    }
  };

  closeError = () => {
    this.setState({error: false});
  };

  handleChange = event => {
    let {controller} = this.props;
    let imageName = event.target.value;
    let imageIndex = controller.getImageIndex(imageName);
    let selectedImage =
        controller.images[imageIndex];
    this.setState({
      imageTitle: imageName,
      referenceImage: selectedImage
    });
  };

  onThresholdChange = (event, value) => {
    this.setState({threshold: value});
  };

  onThresholdTextChange = event => {
    let value = Number.parseFloat(event.target.value);
    if (value >= MIN_THRESHOLD && value <= MAX_THRESHOLD) {
      this.setState({threshold: value});
    }
  };

  render() {
    const {controller, classes} = this.props;
    const imageTitles = controller.getImageTitles();
    return(
        <div>
          <div style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
            <FormControl style={{minWidth: 200, margin: Theme.spacing.unit}}>
              <InputLabel htmlFor="age-simple">Reference Image</InputLabel>
              <Select
                  value={this.state.imageTitle}
                  inputProps={{
                    name: 'referenceHistogram',
                    id: 'age-simple',
                  }}
                  onChange={this.handleChange}
                  disabled={!controller.isAnyImageSelected()}
              >
                {imageTitles.map(title => {
                  return <MenuItem
                      key={title}
                      value={title}>
                    {title}
                  </MenuItem>
                })}
              </Select>
            </FormControl>
            <div className={classes.root}>
              <Slider
                  classes={
                    { container: classes.slider,
                      track: classes.thumb,
                      thumb: classes.thumb}
                  }
                  min = {MIN_THRESHOLD}
                  max = {MAX_THRESHOLD}
                  value={this.state.threshold}
                  aria-labelledby="label"
                  onChange={this.onThresholdChange}
              />
              <TextField
                  style={{margin: "15px"}}
                  value={this.state.threshold}
                  type="number"
                  margin="normal"
                  onChange={this.onThresholdTextChange}
                  color="secondary"
              />
            </div>
            <Button
                style={{margin: "10px"}}
                variant="extendedFab"
                color="secondary"
                onClick={this.applyOperation}>
              Detect changes
            </Button>
          </div>
          <ErrorHandler
              open={this.state.error}
              errorMsg={this.state.errorMsg}
              handler={this.closeError}/>
        </div>
    );
  }
}

export default withStyles(styles)(ChangesDetection);
