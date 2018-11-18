import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

let containerStyles = {
  padding: "10px",
  display: "flex",
  justifyContent: "space-between"
};

class WorkspaceBar extends Component {

  calculateColor = () => {
    let image = this.props.image;
    let {x, y} = this.props.position;

    if (image === undefined || x === -1 || y === -1) {
      return "white";
    } else {
      return "rgb(" + image.getRedComponent(x, y) + ", "
                    + image.getGreenComponent(x, y) + ", "
                    + image.getBlueComponent(x, y) + ")";
    }
  };

  calculateColorText = () => {
    let image = this.props.image;
    let {x, y} = this.props.position;

    if (image === undefined || x === -1 || y === -1) {
      return "r:- g:- b:-";
    } else {
      return "r:" + image.getRedComponent(x, y) + " "
           + "g:" + image.getGreenComponent(x, y) + " "
           + "b:" + image.getBlueComponent(x, y) + " "
    }
  };

  calculatePosition = () => {
    let image = this.props.image;
    let {x, y} = this.props.position;
    if (image === undefined || x === -1 || y === -1) {
      return "x:- y:-";
    } else {
      return "x:" + x + " " + "y:" + y;
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
          </div>
        </Paper>
    )
  }
}

export default WorkspaceBar;