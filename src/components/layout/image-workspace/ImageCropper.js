import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/es/Button/Button';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },
});

class ImageCropper extends React.Component {

  onClick = () => {
    console.log(this.props.controller)
    this.props.controller.cropper();
  }

  render() {
    const { classes } = this.props;
    const controller = this.props.controller;

    return (
      <Button
          label="Upload file"
          onClick={this.onClick}>
        Choose File
      </Button>
    );
  }
}



export default withStyles(styles)(ImageCropper);
