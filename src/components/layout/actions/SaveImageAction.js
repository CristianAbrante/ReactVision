import React, {Component} from 'react';
import Button from '@material-ui/core/es/Button/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/es/Divider/Divider';
import ErrorHandler from '../error/ErrorHandler'

class SaveImageAction extends Component {

  constructor(props) {
    super(props);
    this.inputElem = this.props.controller.getSelectedImage().src;
  }

  render() {
    return (
      <div>
        <Typography variant="overline" style={{padding: "4px 0"}}>
          Save image
        </Typography>
        <Divider />
        <Button label="Save file" href={this.props.controller.getSelectedImage().src} download>
          Download
        </Button>
      </div>
    );
  }
}

export default SaveImageAction;
