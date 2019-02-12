import React, { Component } from "react";
import "./App.css";
import Layout from "./components/hoc/Layout/Layot";
import { Route, Switch, Redirect } from "react-router-dom";
import Search from "./components/Search/Search";
import Uploader from "./components/Uploader/Uploader";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/search" component={Search} />
            <Route path="/uploader" component={Uploader} />
            <Redirect to="/search" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
