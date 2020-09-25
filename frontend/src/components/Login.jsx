import React, { Component } from "react";
import "./styles/SingIn.css";
import { Link, Redirect } from "react-router-dom";
import AuthContext from "../context/auth-context";

export default class Home extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      logedIn: true,
    };

    this.email = React.createRef();
    this.password = React.createRef();
  }
  static contextType = AuthContext;

  loginHandler = (event) => {
    event.preventDefault();
    const email = this.email.current.value;
    const password = this.password.current.value;
    if (email.trim().length === 0 || password.trim().length === 0) {
      alert("Please fill in all the fields");
      return;
    }

    const requestBody = {
      query: `
                query {
                    login(email:"${email}", password:"${password}"){
                        userId
                        token
                        tokenExpiration
                    }
                }
            `,
    };
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          alert("Incorrect email or password");
          return;
        }
        return res.json();
      })
      .then((resData) => {
        if (this.state.logedIn) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
          this.context.token = resData.data.login.token;
          this.context.userId = resData.data.login.userId;
        }
        console.log(resData);
        console.log(this.context);
      })
      .catch((err) => {
        console.log(err);
      });
    this.email.current.value = "";
    this.password.current.value = "";
  };
  render() {
    return (
      <div>
        <link
          href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
          rel="stylesheet"
          id="bootstrap-css"
        />
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <div className="row">
          <div className="col-md-10 offset-1">
            <div className="container register gap-down">
              <div className="row ">
                <div className="col-md-3 register-left text-center gap-up">
                  <h3 className="welcome align-self-middle gap-up">Welcome</h3>
                  <p>You don't have an account?</p>
                  <Link to="/singUp">
                    <input type="submit" className="shadow" value="Sing Up" />
                  </Link>
                </div>
                <div className="col-md-9 register-right">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <h3 className="register-heading">LOGIN</h3>
                      <div className="row register-form">
                        <div className="col-md-6 offset-3">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control"
                              ref={this.email}
                              placeholder="Your Email *"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control"
                              ref={this.password}
                              placeholder="Password *"
                            />
                          </div>
                          <input
                            onClick={this.loginHandler}
                            type="submit"
                            className="btnRegister shadow"
                            value="Login"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
