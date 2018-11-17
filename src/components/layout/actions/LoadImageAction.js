import React, {Component} from 'react';
import Button from '@material-ui/core/es/Button/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/es/Divider/Divider';
import Loader from '../../../processor/IO/ImageFileLoader'
import ErrorHandler from '../error/ErrorHandler'

class LoadImageAction extends Component {
  state = {
    error: false,
    errorMsg: "error"
  };

  constructor(props) {
    super(props);
    this.inputElem = React.createRef();
  }

  handleError = (msg) => {
    this.setState({error: true, errorMsg: msg})
  };

  closeError = (msg) => {
    this.setState({error: false})
  };

  handleChange = e => {
    let loader = new Loader();
    let controller = this.props.controller;
    try {
      loader.load(this.inputElem.current, () => {
        let image = loader.getReadFile();
        controller.add(image);
      });
    }
    catch (e) {
      this.handleError(e.message);
    }
  };

  openFileDialog = () => {
    this.inputElem.current.click();
  };

  render() {
    return (
      <div>
        <Typography
            variant="overline"
            style={{padding: "4px 0"}}>
          Load Image
        </Typography>
        <Divider />
        <Button
            label="Upload file"
            onClick={this.openFileDialog}>
          Choose File
        </Button>
        <input
            ref={this.inputElem}
            type="file"
            style={{"display" : "none"}}
            onChange={this.handleChange}/>
        <ErrorHandler
            open={this.state.error}
            errorMsg={this.state.errorMsg}
            handler={this.closeError}/>
      </div>
    );
  }
}

export default LoadImageAction;