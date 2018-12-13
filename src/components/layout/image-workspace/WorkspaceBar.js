import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ProcessImage from '../../../processor/image/ProcessImage'

let containerStyles = {
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

class WorkspaceBar extends Component {

  calculateColor = () => {
    let image = this.props.controller.getSelectedImage();
    let {x, y} = this.props.position;

    if (image === undefined
        || !image.indexesAreInRange(x, y)
        || x === -1
        || y === -1) {
      return "white";
    } else {
      return "rgb(" + image.getRedComponent(x, y) + ", "
                    + image.getGreenComponent(x, y) + ", "
                    + image.getBlueComponent(x, y) + ")";
    }
  };

  calculateColorText = () => {
    let image = this.props.controller.getSelectedImage();
    let {x, y} = this.props.position;

    if (image === undefined
        || !image.indexesAreInRange(x, y)
        || x === -1
        || y === -1) {
      return "r:- g:- b:-";
    } else {
      return "r:" + image.getRedComponent(x, y) + " "
           + "g:" + image.getGreenComponent(x, y) + " "
           + "b:" + image.getBlueComponent(x, y) + " "
    }
  };

  calculatePosition = () => {
    let image = this.props.controller.getSelectedImage();
    let {x, y} = this.props.position;
    if (image === undefined || x === -1 || y === -1) {
      return "x:- y:-";
    } else {
      return "x:" + x + " " + "y:" + y;
    }
  };

  duplicateActualImage = () => {
    if(this.props.controller.numberOfImages() > 0) {
      let image = this.props.controller.getSelectedImage();
      let newImage = new ProcessImage(image.getTitle() + " - Duplicated." + image.getFormat(), image.getWidth(), image.getHeight(), image.getImageData().data);
      this.props.controller.add(newImage);
    }
  }

  updateImageState = operation => () => {
      let {controller} = this.props;
      let image = controller.getSelectedImage()
      if (image !== undefined) {
        switch (operation) {
          case 'undo': {
            image.setPreviousState();
            break;
          }
          case 'redo': {
            image.setNextState();
            break;
          }
          case 'restore': {
            image.setInitialState();
            break;
          }
        }

        controller.updateImageHistogram();
        controller.updateImageCanvas();
        controller.resetActionMethod(undefined);
        controller.updateMethod();

    }

  };

  render() {
    return (
        <Paper
          style={containerStyles}>
          <div>
            <Chip
                avatar={
                  <Avatar
                      style={{background: this.calculateColor()}}/>
                }
                style={{marginRight: "5px"}}
                label={this.calculateColorText()}
                color="secondary"
                variant="outlined"/>
            <Chip
                label={this.calculatePosition()}
                color="secondary"
                variant="outlined"/>
          </div>
          <div>
          <span
            style={{borderRight: "1px solid #babdbe"}}>
          <IconButton
              color="secondary"
              onClick={this.duplicateActualImage}>
            <Icon>add_to_photos</Icon>
          </IconButton>
          </span>
            <IconButton
                color="secondary"
                onClick={this.updateImageState('undo')}>
              <Icon>undo</Icon>
            </IconButton>
            <IconButton
                color="secondary"
                onClick={this.updateImageState('restore')}>
              <Icon>compare</Icon>
            </IconButton>
            <IconButton
                color="secondary"
                onClick={this.updateImageState('redo')}>
              <Icon>redo</Icon>
            </IconButton>
          </div>
        </Paper>
    )
  }
}

export default WorkspaceBar;
