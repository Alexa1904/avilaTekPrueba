import React, { Component } from "react";
import logo from "./images/logoAvilaHunt.png";
import usuario from "./images/usuario.png";
import "./styles/Header.css";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth-context";

export default class Header extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      logedIn: true,
    };
  }

  render() {
    return (
      <AuthContext.Consumer>
        {(context) => {
          return (
            <div className="cont aling-center">
              <div className="row">
                <div className="col-md-10 offset-1 shadow shadow-box">
                  <div className="row">
                    <div className="col-md-3 text-center">
                      <Link to="/">
                        <img src={logo} id="logo" alt="" />
                      </Link>
                    </div>
                    <div className="col-md-4 title align-self-center offset-1 text-center">
                      <h2>
                        <span id="avila">AVILA</span> HUNT
                      </h2>
                    </div>
                    {!context.token && (
                      <React.Fragment>
                        <div className="col-md-2 align-self-center text-right padding0 ">
                          <Link to="/login">
                            <input
                              type="submit"
                              className="options shadow"
                              value="Login"
                            />
                          </Link>
                        </div>
                        <div className="col-md-2  align-self-center text-left">
                          <Link to="/singUp">
                            <input
                              type="submit"
                              className="options shadow"
                              id="green-button"
                              value="Sing Up"
                            />
                          </Link>
                        </div>
                      </React.Fragment>
                    )}
                    {context.token && (
                      <React.Fragment>
                        <div className="col-md-2 align-self-center text-right padding0 ">
                          <input
                            onClick={context.logout}
                            type="submit"
                            class="options shadow"
                            id="green-button"
                            value="Logout"
                          />
                        </div>
                        <div className="col-md-2 align-self-center">
                          <Link to="/profile">
                            <img
                              id="avatar"
                              className="usuario align-self-center"
                              src={usuario}
                              alt=""
                            />
                          </Link>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}
