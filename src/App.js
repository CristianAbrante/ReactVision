import React, { Component } from "react";
//import './App.css';
import MainMenu from "./components/menu/MainMenu";
import MenuData from "./data/menu";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainMenu items={MenuData.items} />
      </div>
    );
  }
}

export default App;
