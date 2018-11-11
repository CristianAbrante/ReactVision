import React from 'react';
import PropTypes from 'prop-types';
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

class ImageTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
        <div className={classes.root}>
          <AppBar style={{width: "71vw"}} position="static" color="default">
            <Tabs
                value={value}
                onChange={this.handleChange}
                scrollable
                scrollButtons="auto"
            >
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
              <Tab label="Item Four" />
              <Tab label="Item Five" />
              <Tab label="Item Six" />
              <Tab label="Item Seven" />
            </Tabs>
          </AppBar>
        </div>
    );
  }
}

ImageTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageTabs);
