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
  handleChange = (event, value) => {
    this.props.controller.updateSelectedImage(value);
  };

  render() {
    const { classes } = this.props;
    const controller = this.props.controller;

    return (
        <div className={classes.root}>
          <AppBar
              style={{width: "71vw"}}
              position="static"
              color="default">
            <Tabs
                value={this.props.controller.getSelectedImageIndex()}
                onChange={this.handleChange}
                scrollable
                scrollButtons="auto"
            >
              {
                controller.getImageTitles().map(
                    title => <Tab label={title}></Tab>
                )
              }
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
