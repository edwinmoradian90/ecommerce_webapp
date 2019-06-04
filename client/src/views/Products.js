import React, { Component } from "react";
import ProductsGet from "../components/ProductsGet";
import PageTitle from "../components/PageTitle";

export default class Products extends Component {
  render() {
    return (
      <div>
        <PageTitle
          name="Products"
          description="Everything you need, all in one place"
        />
        <ProductsGet />
      </div>
    );
  }
}
