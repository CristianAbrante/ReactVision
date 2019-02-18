import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import HistogramInfo from './histogram/HistogramInfo';
import Histogram from './histogram/Histogram';
import ImageInfo from './histogram/ImageInfo';
import Window from '../windows/Window';
import theme from '../../theme/';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NoSsr from '@material-ui/core/NoSsr';

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  alignContent: "stretch"
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
});

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: "7px 15px" }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

class Info extends Component {
  state = {
    accumulative: false,
    red: false,
    green: false,
    blue: false,
    disableColors: true,
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });

    if(value === 1)
      this.setState({ accumulative: true });
    else
      this.setState({ accumulative: false });
  };

  renderHistogram = () => {
    let histogram = this.props.controller.getCurrentHistogram();
    if (histogram === undefined) {
      return (
          <div className="empty-histogram">
          <Typography component="span">
            Histogram
          </Typography>
          </div>
      )
    } else {
      return (
            <Histogram
                accumulative = {this.state.accumulative}
                brightness = {this.state.disableColors}
                r = {this.state.red}
                g = {this.state.green}
                b = {this.state.blue}
                currentHistogram={histogram} />
        );
    }
  };

  handleBrightnessVisualization = () => {
    this.setState({disableColors: !this.state.disableColors,
                    red: false, blue: false, green: false});
  };

  handleHistogramVisualization = () => {
    this.setState({accumulative: !this.state.accumulative});
  };

  handleColorsVisualization = (colorOn, colorOff) => {
    if(colorOn.length > 0) {
      this.setState({disableColors: false});
    } else {
      this.setState({disableColors: true});
    }

    colorOn.forEach(color => {
      this.setState({[color.toLowerCase()]: true});
    });

    colorOff.forEach(color => {
      this.setState({[color.toLowerCase()]: false});
    })

  };

  render() {
    let histogram = this.props.controller.getCurrentHistogram();
    const { value } = this.state;

    return(
        <Window title="Image info">
            <AppBar id="info-tabs" position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              variant="fullWidth"
              centered
            >
              <Tab label="Histogram" />
              <Tab label="Accumulative histogram" />
            </Tabs>
          </AppBar>

            {(value === 0 || value === 1) && <TabContainer dir={theme.direction}>
                {<div className="windows histogram">
                <HistogramInfo
                    options={this.state}
                    onHistogramOption={this.handleHistogramVisualization}
                    onColorOptions={this.handleColorsVisualization}
                    onBrightnessOption={this.handleBrightnessVisualization}/>
                  {this.renderHistogram()}
                  <ImageInfo histogram={histogram}/>
                  </div>}
            </TabContainer>}
       </Window>
    )
  }
}

Info.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(Info);
