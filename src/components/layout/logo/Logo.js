import React, { Component } from "react";
import './logo.css'

class Logo extends Component {
  render() {
    return(
        <div className="title">
          <a href="https://github.com/CristianAbrante/ReactVision">
            <span className="first">react</span>
            <span className="second">vision</span>
          </a>
        </div>
    );
  }
}

export default Logo;