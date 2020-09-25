import React from "react";
import "./styles/SingIn.css";

const SingIn = () => (
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
              <input className="shadow" type="submit" name="" value="Sing Up" />
              <br />
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
                          placeholder="Your Email *"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password *"
                        />
                      </div>
                      <input
                        type="submit"
                        className="btnRegister shadow"
                        value="Register"
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

export default SingIn;
