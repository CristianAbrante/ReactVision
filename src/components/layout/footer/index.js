import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography'
import './footer.css'
import theme from '../../theme'

const aStyle = {
  textDecoration: "none",
  color: theme.palette.secondary.main
}

function footer() {
  return(
      <React.Fragment>
        <Typography>
          <span>By </span>
          <a
              style={aStyle}
              href="https://github.com/CristianAbrante">
            Cristian Abrante
          </a>
          <span> & </span>
          <a
              style={aStyle}
              href="https://github.com/AlberTJ97">
            Alberto González
          </a>
        </Typography>
      </React.Fragment>
  )
}

export default footer;