import React, { Component } from "react";
import CheckOutDisplay from "./ChecKOutDisplay";
import { withRouter } from "react-router-dom";

class CheckOutPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtotal: "",
      total: "",
      price: "",
      amount: 1
    };
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps > 1) {
      this.setState(
        {
          amount: nextProps.amount
        },
        () => {
          console.log(this.state.amount);
          this.props.getTotal(this.state.total);
        }
      );
    }
    return true;
  };

  componentDidMount = () => {
    document.addEventListener("click", this.handleClick);
    this.getTotalAmounts();
    this.props.getTotal(this.state.total);
  };

  getTotalAmounts = () => {
    let items = JSON.parse(localStorage.getItem("User Items")) || [];
    if (items.length === 0) {
      return this.setState(
        {
          total: "0.00",
          subtotal: "0.00"
        },
        () => {
          this.props.componentWillUpdate(this.state.total);
          this.props.getTotal(this.state.total);
        }
      );
    } else {
      let amount = items.map(item => item.amount);
      let price = items.map(item => item.price);
      let subtotal = this.addTotal(price, amount).reduce((acc, a) => {
        return acc + a;
      });
      let total = this.calculateTotal(subtotal);
      this.setState(
        {
          total: total,
          subtotal: subtotal,
          amount: amount,
          price: price,
          indvidualPrice: []
        },
        () => {
          this.props.getTotal(this.state.total);
        }
      );
    }
  };

  handleClick = () => {
    this.getTotalAmounts();
    this.forceUpdate();
  };

  addTotal = (price, amount) => {
    let sum = [];
    for (let i = 0; i < amount.length; i++) {
      sum.push(price[i] * amount[i]);
    }
    return sum;
  };

  calculateTotal = subTotal => {
    const add = subTotal * (7.25 / 100);
    const total = (subTotal + add).toFixed(2);
    return Number(total);
  };

  getPrice = userItems => {
    const price = userItems.map(item => Number(item.price));
    const sum = price.reduce((partial_sum, a) => partial_sum + a);
    this.calculateTotal(sum);
    return Number(sum);
  };

  componentWillUnmount = () => {
    document.removeEventListener("click", this.handleClick);
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h2
            style={{
              fontWeight: 250,
              paddingBottom: "10px",
              color: "white",
              backgroundColor: "#333",
              padding: "8px"
            }}
          >
            Summary
          </h2>
          <CheckOutDisplay
            total={this.state.total}
            subtotal={this.state.subtotal}
            amount={this.state.amount}
            price={this.state.price}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(CheckOutPrice);
