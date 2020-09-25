import React, { Component } from "react";
import "./styles/MyProducts.css";
import AuthContext from "../context/auth-context";
import img from "./images/img.jpg";

export default class MyProducts extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      products: [],
    };
  }
  static contextType = AuthContext;

  componentDidMount() {
    console.log(this.context.userId);
    const requestBody = {
      query: `
                query{
                    user(id:"${this.context.userId}"){
                        createdProducts{
                            name
                            description
                            releaseDate
                            link
                            votes
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
        const products = resData.data.user.createdProducts;
        console.log(products);
        this.setState({ products: products });
        console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.products.map((product) => (
          <div className="row gap-down">
            <div className="col-md-10 offset-1 shadow product-box">
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
                  <h5 className="aling-self-center votes gap-up">
                    {product.votes}
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <p>
                    Link:<a href="">{product.link}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}
