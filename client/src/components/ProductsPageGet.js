import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ProductPageItem from "../components/ProductPageItem";

class ProductsPageGet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      name: "",
      img: "",
      description: "",
      price: "",
      isLoaded: false,
      categoryPage: false,
      mainPage: false
    };
  }

  componentDidMount() {
    const productName = this.props.match.params.product;
    console.log(productName);
    fetch(`/api/products/${productName}`)
      .then(res => res.json())
      .then(product => {
        let pageChecker = this.pageChecker();
        if (pageChecker) {
          this.setState({
            category: product.category,
            name: product.name,
            img: product.img,
            description: product.description,
            price: product.price,
            isLoaded: true,
            categoryPage: true,
            mainPage: false
          });
        } else {
          this.setState({
            category: product.category,
            name: product.name,
            img: product.img,
            description: product.description,
            price: product.price,
            isLoaded: true,
            categoryPage: false,
            mainPage: true
          });
        }
      })
      .catch(err => console.log(err));
  }

  pageChecker = () => {
    let category = this.props.match.params.category;
    if (category) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    return (
      <div>
        <ProductPageItem
          category={this.state.category}
          name={this.state.name}
          img={this.state.img}
          description={this.state.description}
          price={this.state.price}
          isLoaded={this.state.isLoaded}
          categoryPage={this.state.categoryPage}
        />
      </div>
    );
  }
}

export default withRouter(ProductsPageGet);
