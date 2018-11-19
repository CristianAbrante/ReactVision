import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/es/Button/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/es/Divider/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ErrorHandler from '../error/ErrorHandler';
import saveAs from 'file-saver';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    width: 100,
  },

  button: {
    margin: theme.spacing.unit
  }
});

class SaveImageAction extends Component {
  state = {
    format: '',
    error: false,
    errorMsg: "error",
    labelWidth: 0,
  };

  constructor(props) {
    super(props);
  }

  handleError = (msg) => {
    this.setState({error: true, errorMsg: msg})
  };

  handleFormChange= event => {
   this.setState({ [event.target.name]: event.target.value });
 };

  closeError = (msg) => {
    this.setState({error: false})
  };

  componentDidMount() {
      this.setState({
        labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      });
    }

  saveFile = () => {
    try {
      if(this.props.controller.numberOfImages() <= 0){
        throw new Error('there isn\'t any image to download.');
      }

      if(this.state.format === ""){
          throw new Error('you have to select one image format.');
      }


      let controller = this.props.controller;
      let format = this.state.format;

      controller.getCanvas().toBlob(function(blob) {
        saveAs(blob, controller.getSelectedImage().getTitle() + "." + format);
      });
    } catch (e) {
      this.handleError(e.message);
    }

  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="overline" style={{padding: "4px 0"}}>
          Save image
        </Typography>
        <Divider />
        <div>
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-format-simple"
            >
              Format
            </InputLabel>
            <Select
              value={this.state.format}
              onChange={this.handleFormChange}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="format"
                  id="outlined-format-simple"
                />
              }
            >
              <MenuItem value="tiff">tiff</MenuItem>
              <MenuItem value="raw">raw</MenuItem>
              <MenuItem value="png">png</MenuItem>
            </Select>
          </FormControl>
          </div>
          <div>
          <Button
            className={classes.button}
            label="Save file"
            onClick={this.saveFile}>
            Download
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

SaveImageAction.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SaveImageAction);
