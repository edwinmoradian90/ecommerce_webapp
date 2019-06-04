import React, { Component } from "react";
import ProductList from "./ProductList";

export default class ProductsPage extends Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    fetch("/api/products/all")
      .then(res => res.json())
      .then(products => this.setState({ products: products }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <ProductList products={this.state.products} />
      </div>
    );
  }
}
