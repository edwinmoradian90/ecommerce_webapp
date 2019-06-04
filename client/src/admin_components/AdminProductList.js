import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import AdminProductDisplay from "./AdminProductDisplay";

class AdminProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      productName: "",
      featured: false,
      button: true
    };
  }

  componentDidMount = () => {
    this.getItems();
  };

  getItems = () => {
    axios
      .get("/api/products/all")
      .then(res => this.setState({ items: res.data }))
      .catch(err => console.log(err));
  };

  editProduct = e => {
    e.preventDefault();
    let current = e.currentTarget.getAttribute("name");
    this.props.history.push(`/dashboard/products/${current}`);
  };

  sortFeatured = () => {
    let items = this.state.items
      .map(item => item)
      .filter(item => item.featured === true);
    this.setState({ items: items });
  };

  sortNotInstock = () => {
    let items = this.state.items
      .map(item => item)
      .filter(item => item.instock === false);
    this.setState({ items: items }, console.log(this.state.items));
  };

  sortInstock = () => {
    let items = this.state.items
      .map(item => item)
      .filter(item => item.instock === true);
    this.setState({ items: items }, console.log(this.state.items));
  };

  sortPriceLeastToGreatest = () => {
    let items = this.state.items.sort((a, b) => {
      return a.price - b.price;
    });

    this.setState({ items: items }, () => console.log(this.state.items));
  };

  sortPriceGreatestToLeast = () => {
    let items = this.state.items.sort((a, b) => {
      return b.price - a.price;
    });

    this.setState({ items: items }, () => console.log(this.state.items));
  };

  uploadDate = () => {
    this.getItems();
  };

  render() {
    return (
      <div>
        {this.state.items.map((item, index) => {
          return (
            <div key={index}>
              <AdminProductDisplay
                id={index}
                item={item}
                editProduct={this.editProduct}
                sortFeatured={this.sortFeatured}
                sortInstock={this.sortInstock}
                sortNotInstock={this.sortNotInstock}
                uploadDate={this.uploadDate}
                sortPriceLeastToGreatest={this.sortPriceLeastToGreatest}
                sortPriceGreatestToLeast={this.sortPriceGreatestToLeast}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(AdminProductList);
