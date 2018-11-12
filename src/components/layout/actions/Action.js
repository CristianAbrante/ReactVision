import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import LoadImage from './LoadImageAction';

class Action extends Component {
  render() {
    return(
        <Paper
            style={{height: "100%"}}>
          <LoadImage controller={this.props.controller}/>
        </Paper>
    )
  }
}

export default Action;