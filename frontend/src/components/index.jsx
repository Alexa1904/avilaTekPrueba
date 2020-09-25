import React, { Component } from "react";
import Header from "./Header";
import "./index.css";
import "./Login";
import Login from "./Login";
import SingUp from "./SingUp";
import Profile from "./Profile";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AuthContext from "../context/auth-context";

class App extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      token: null,
      userId: null,
    };
  }
  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <div>
        <Router>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout,
            }}
          >
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              {!this.state.token && (
                <Route exact path="/login" exact component={Login} />
              )}
              {!this.state.token && (
                <Route exact path="/singUp" exact component={SingUp} />
              )}
              {this.state.token && (
                <Route exact path="/profile" exact component={Profile} />
              )}
              {this.state.token && <Redirect to="/profile" />}
              {!this.state.token && <Redirect to="/" />}
            </Switch>
          </AuthContext.Provider>
        </Router>
      </div>
    );
  }
}

export default App;
