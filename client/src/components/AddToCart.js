import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import GeneralButton from "./GeneralButton";
import { Alert } from "react-bootstrap";

class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.state = {
      items: [],
      names: [],
      ids: [],
      imgs: [],
      prices: [],
      amount: 0,
      button: false
    };
  }

  fetchCartItems = productName => {
    fetch(`/api/products/${productName}`)
      .then(res => res.json())
      .then(items => {
        let names = items.name;
        let ids = items._id;
        let imgs = items.img;
        let prices = items.price;
        this.setState({
          names: names,
          ids: ids,
          imgs: imgs,
          prices: prices,
          amount: this.state.amount + 1
        });
      });
  };

  getAllItems = () => {
    let items = JSON.parse(localStorage.getItem("User Items")) || [];
    return items;
  };

  getId = items => {
    let productIds = items.map(item => item._id);
    return productIds;
  };

  quantity = () => {
    this.setState(
      {
        amount: this.state.amount + 1
      },
      () => {
        console.log(this.state.amount);
      }
    );
  };

  userItemCheck = productName => {
    let items = this.getAllItems();
    let itemName = items.map(item => item.name);
    if (
      items === undefined ||
      items.length === 0 ||
      !itemName.includes(productName)
    ) {
      return true;
    } else {
      return false;
    }
  };

  pushToLocalStorageItems = () => {
    let items = this.getAllItems();
    items.push({
      name: this.state.names,
      id: this.state.ids,
      img: this.state.imgs,
      price: this.state.prices,
      amount: this.state.amount
    });
    localStorage.setItem("User Items", JSON.stringify(items));
    console.log("successfully stored");
  };

  updateLocalStorageItems = () => {
    let items = this.getAllItems();
    if (items !== undefined && items.length !== 0 && this.state.amount !== 0) {
      items.filter(
        items =>
          items.name === this.props.match.params.product ||
          this.props.match.params.category
      )[0].amount += this.state.amount;
      return localStorage.setItem("User Items", JSON.stringify(items));
    }
  };

  addToCart() {
    let productName =
      this.props.match.params.product || this.props.match.params.category;
    console.log(`${productName} added to cart`);
    this.updateLocalStorageItems();
    this.userItemCheck(productName)
      ? this.fetchCartItems(productName)
      : this.quantity(productName);

    this.setState({
      button: true
    });
  }

  closeAlert = () => {
    this.setState({
      button: false
    });
  };

  componentWillUnmount = () => {
    this.state.names.length !== 0
      ? this.pushToLocalStorageItems()
      : this.updateLocalStorageItems();
  };

  render() {
    return (
      <div>
        <GeneralButton
          variant="success"
          onClick={this.addToCart}
          action="Add to cart"
        >
          Add to cart
        </GeneralButton>
        <Alert
          variant="success"
          show={this.state.button}
          onClick={this.closeAlert}
          dismissible
        >
          Added ({this.state.amount}) {this.props.match.params.product} to your
          cart!
          <Link to="/cart" style={{ color: "green" }}>
            Click to view cart.
          </Link>
        </Alert>
      </div>
    );
  }
}

export default withRouter(AddToCart);
