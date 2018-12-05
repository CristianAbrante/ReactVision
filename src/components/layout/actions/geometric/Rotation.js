import React, {Component} from 'react';
import RawRotation from '../../../../processor/operations/geometric/rotation/Rotation';
import Icon from '@material-ui/core/Icon/Icon';
import Typography from '@material-ui/core/Typography/Typography';
import Divider from '@material-ui/core/Divider/Divider';

class Rotation extends Component {
  render() {
    return(
        <div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Icon style={{padding: "5px"}}>crop_rotate</Icon>
            <Typography
                variant="overline">
              Rotation
            </Typography>
          </div>
          <Divider/>
        </div>
    )
  }
}

export default Rotation;