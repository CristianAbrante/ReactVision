import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import ActionPicker from './ActionPicker';

class Action extends Component {

  renderAction() {
    let currentAction = this.props.currentAction;
    let controller = this.props.controller;

    if (currentAction === undefined) {
      return (<Typography>Pick any action from the menu.</Typography>);
    } else {
      return ActionPicker[currentAction](controller);
    }
  }

  render() {
    return(
        <Paper
            style={{height: "100%"}}>
          {this.renderAction()}
        </Paper>
    )
  }
}

export default Action;