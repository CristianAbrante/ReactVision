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
import ErrorHandler from '../../../error/ErrorHandler';
import ImageDifferenceOperation
  from '../../../../../processor/operations/point/non-lineal/ImageDifference';


class ImageDifference extends Component {
  state = {
    imageTitle: "",
    referenceImage: undefined,
    error: false,
    errorMsg: ''
  };

  applyOperation = () => {
    let {controller} = this.props;
    let {referenceImage} = this.state;
    if (controller.isAnyImageSelected()) {
      if (referenceImage !== undefined) {
        let operation = new ImageDifferenceOperation();
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

  render() {
    const {controller} = this.props;
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
            <Button
                style={{margin: "10px"}}
                variant="extendedFab"
                color="secondary"
                onClick={this.applyOperation}>
              Apply Difference
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

export default ImageDifference;
