import React, {Component} from 'react';
import Snackbar from '@material-ui/core/es/Snackbar/Snackbar';
import Button from '@material-ui/core/es/Button/Button';

class ErrorHandler extends Component {
  action = (
      <Button
          color="secondary"
          size="small"
          onClick={this.props.handler}>
        close
      </Button>
  );

  render() {
    return(
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={this.props.open}
            onClose={this.props.handler}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={this.props.errorMsg}
            action={this.action}
        />
    )
  }
}

export default ErrorHandler;