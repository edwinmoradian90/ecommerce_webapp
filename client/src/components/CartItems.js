import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CartDisplay from "./CartDisplay";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.state = {
      cartItems: []
    };
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    let cartItems = JSON.parse(localStorage.getItem("User Items")) || [];
    cartItems !== undefined
      ? this.setState({
          cartItems: cartItems
        })
      : console.log("failed");
  };

  removeItem(clickedItem, e) {
    let cartItems = this.state.cartItems
      .map(items => items)
      .filter(item => item.id !== clickedItem);
    this.setState(
      {
        cartItems: cartItems
      },
      () => {
        localStorage.removeItem("User Items");
        let newItems = this.state.cartItems;
        localStorage.setItem("User Items", JSON.stringify(newItems));
        if (!this.state.cartItems[0]) {
          localStorage.removeItem("User Items");
        }
      }
    );
  }

  render() {
    return (
      <div>
        {this.state.cartItems.map((item, i) => (
          <div key={i}>
            <CartDisplay
              id={i}
              item={item}
              itemAmount={item.amount}
              individualPrice={this.individualPrice}
              removeItem={this.removeItem}
              getAmount={this.getAmount}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(Cart);
