import React, { Component } from "react";
import "./styles/VotedProducts.css";

export default class VotedProducts extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      id: String,
    };
  }

  render() {
    return <div>Aqui van los productos</div>;
  }
}
