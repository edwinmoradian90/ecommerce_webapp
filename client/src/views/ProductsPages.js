import React, { Component } from "react";
import ProductsPageGet from "../components/ProductsPageGet";

export default class ProductsPages extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <ProductsPageGet />
      </div>
    );
  }
}
