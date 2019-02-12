import React, { Component } from "react";
import NavBar from "../../NavBar/Navbar";
import "./Layout.css";

class Layot extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <main className="container main">{this.props.children}</main>
      </div>
    );
  }
}

export default Layot;
