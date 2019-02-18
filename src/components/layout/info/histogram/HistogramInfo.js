import React, {Component} from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const colors = [
  'Red',
  'Green',
  'Blue',
];


class HistogramInfo extends Component {
  state = {
    color: [],
    labelWidth: 0
  };

  handleChange = event => {
    this.setState({ color: event.target.value });
    let difference = colors.filter(x => !event.target.value.includes(x));
    this.props.onColorOptions(event.target.value, difference);
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  render() {
    const {accumulative, red, green, blue, disableColors} = this.props.options;
    const { classes } = this.props;

    return(
      <div className="histogram-options">
        <FormControlLabel
                control={
                  <Switch
                      checked={disableColors}
                      value="Brightness"
                      onChange ={this.props.onBrightnessOption}/>
                }
                label="Brightness"/>
          <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="members"
          >
            Channels
          </InputLabel>
            <Select
              multiple
              value={this.state.color}
              onChange={this.handleChange}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="channel"
                  id="outlined-select-multiple-checkbox"
                />
              }
              renderValue={selected => selected.join(' + ')}
              MenuProps={MenuProps}
              variant="outlined"
            >
              {colors.map(color => (
                <MenuItem key={color} value={color}>
                  <Checkbox checked={this.state.color.indexOf(color) > -1} />
                  <ListItemText primary={color} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
    )
  }
}

HistogramInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(HistogramInfo);
