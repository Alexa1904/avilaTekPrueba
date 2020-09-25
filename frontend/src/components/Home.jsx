import React, { Component } from "react";
import "./styles/Home.css";
import img from "./images/img.jpg";
import AuthContext from "../context/auth-context";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      products: [],
      logedIn: false,
      type: 1,
      token: String,
      dayPName: String,
      dayPDes: String,
      dayPLink: String,
    };
  }

  static contextType = AuthContext;

  componentDidMount() {
    const requestBody = {
      query: `
                query{
                    products{
                        _id
                        name
                        description
                        releaseDate
                        link
                        votes
                        founder{
                            type
                        }
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
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        const products = resData.data.products;
        this.setState({ products: products });
        console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      });
    this.productDay();
  }

  voteHandler(id) {
    if (!this.context.token) {
      alert("Please login so you can vote");
    }

    console.log(id);
    const requestBody = {
      query: `
                mutation{
                    voting(id:"${id}"){
                        name
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
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });

    this.componentDidMount();
  }

  productDay = () => {
    const requestBody = {
      query: `
                query{
                    productDay{
                        name
                        description
                        link
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
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        this.setState({
          dayPName: resData.data.productDay.name,
          dayPDes: resData.data.productDay.description,
          dayPLink: resData.data.productDay.link,
        });
        console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="gap-up">
          <div className="row">
            <div className="col-md-4 offset-1">
              <h3>TODAY</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7 offset-1 ">
              {this.state.products.map((product) => (
                <div key={product._id} className="row gap-down">
                  <div className="col-md-12 shadow product-box">
                    <div className="row">
                      <div className="col-md-2">
                        <img src={img} className="img gap-up" alt="" />
                      </div>
                      <div className="col-md-4 gap-up">
                        <h4>{product.name}</h4>
                        <p>{product.description}</p>
                      </div>
                      <div className="col-md-4 offset-2 text-center">
                        <p>{product.releaseDate}</p>
                        <p className="gap-up title">Votes</p>
                        <h5 className="votes">{product.votes}</h5>
                        <Link to="/">
                          <input
                            onClick={this.voteHandler.bind(this, product._id)}
                            type="submit"
                            className="vote-btn"
                            value="vote"
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-8">
                        <p>
                          Link: <a href="">{product.link}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-3 shadow dayProduct">
              <div className="row">
                <div className="col-md">
                  <h4 className="text-center gap-up welcome">
                    Product of the Day
                  </h4>
                </div>
              </div>
              <div className="row text-center">
                <div className="col-md-5 offset-1 day-img">
                  <img src={img} className="img gap-up" alt="" />
                </div>
                <div className="col-md-5 text-left">
                  <h4 className="gap-up">{this.state.dayPName}</h4>
                  <p>{this.state.dayPDes}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-10 offset-1">
                  <p>
                    <a href="">{this.state.dayPLink}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
