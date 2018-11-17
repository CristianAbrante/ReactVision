import React, {Component} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';

class HistogramInfo extends Component {
  render() {
    const {accumulative, red, green, blue} = this.props.options;
    return(
        <FormControl>
          <FormLabel>Histogram Options</FormLabel>
          <Divider/>
          <FormGroup row>
            <FormControlLabel
                control={
                  <Switch
                      checked={accumulative}
                      value="accumulative"
                      onChange ={this.props.onHistogramOption}/>
                }
                label="accumulative"/>
            <FormControlLabel
                control={
                  <Checkbox
                      checked={red}
                      value="red"
                      onChange ={this.props.onColorOptions('red')}/>
                }
                label="red"/>
            <FormControlLabel
                control={
                  <Checkbox
                      checked={green}
                      value="green"
                      onChange ={this.props.onColorOptions('green')}/>
                }
                label="green"/>
            <FormControlLabel
                control={
                  <Checkbox
                      checked={blue}
                      value="blue"
                      onChange ={this.props.onColorOptions('blue')}/>
                }
                label="blue"/>
          </FormGroup>
        </FormControl>
    )
  }
}

export default HistogramInfo;