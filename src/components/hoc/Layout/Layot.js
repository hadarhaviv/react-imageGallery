import React, { Component } from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import "./Layout.css";

class Layot extends Component {
  render() {
    return (
      <div>
        <Toolbar />
        <main className="container main">{this.props.children}</main>
      </div>
    );
  }
}

export default Layot;
