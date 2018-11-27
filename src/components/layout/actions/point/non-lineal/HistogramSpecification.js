import React, {Component} from 'react';
import Icon from '@material-ui/core/Icon/Icon';
import Typography from '@material-ui/core/Typography/Typography';
import Divider from '@material-ui/core/Divider/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Theme from '../../../../theme';

import HistogramSpecificationOperation
  from '../../../../../processor/operations/point/non-lineal/HistogramSpecification';
import Button from '@material-ui/core/Button/Button';
import LookUpTable from '../../../../../processor/operations/point/LookUpTable';

class HistogramSpecification extends Component {
  histogramSpecificationOperation;
  operationHasBeenApplied = false;

  state = {
    referenceHistogramTitle: "",
    referenceHistogram: undefined
  };

  applyOperation = () => {
    console.log('clicked');
    let {controller} = this.props;
    let {referenceHistogram} = this.state;
    if (controller.isAnyImageSelected()) {
      if (referenceHistogram !== undefined) {
        let image = controller.getSelectedImage();
        if (!this.operationHasBeenApplied) {
          image = controller.getSelectedImage();
          image.createNewState();
          image.setNextState();
          this.operationHasBeenApplied = true;
        }
        let selectedHistogram = controller.getCurrentHistogram();
        this.histogramSpecificationOperation =
            new HistogramSpecificationOperation(selectedHistogram, referenceHistogram);
        let lut = new LookUpTable(this.histogramSpecificationOperation);
        controller.applyPointOperation(lut, 'brightness');
      }
    }
  };

  handleChange = event => {
    let {controller} = this.props;
    let imageName = event.target.value;
    let histogramIndex = controller.getImageIndex(imageName);
    let selectedHistogram =
        controller.histograms[histogramIndex];
    this.setState({
      referenceHistogramTitle: imageName,
      referenceHistogram: selectedHistogram
    });
  };

  render() {
    const {controller} = this.props;
    const imageTitles = controller.getImageTitles();
    return(
        <div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Icon style={{padding: "5px"}}>gradient</Icon>
            <Typography
                variant="overline">
              Histogram Specification
            </Typography>
          </div>
          <Divider/>
          <div style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
            <FormControl style={{minWidth: 200, margin: Theme.spacing.unit}}>
              <InputLabel htmlFor="age-simple">Reference Image</InputLabel>
              <Select
                  value={this.state.referenceHistogramTitle}
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
              Apply Specification
            </Button>
          </div>
        </div>
    );
  }
}

export default HistogramSpecification;