import React, { Component } from "react";
import GeneralButton from "./GeneralButton";

class CheckOutQuantity extends Component {
  constructor(props) {
    super(props);

    this.plusOne = this.plusOne.bind(this);
    this.minusOne = this.minusOne.bind(this);

    this.state = {
      itemAmount: 1
    };
  }

  componentDidMount = () => {
    let itemAmount = this.props.itemAmount;
    this.setState({
      itemAmount: itemAmount
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.itemAmount !== this.props.itemAmount) {
      let itemAmount = this.props.itemAmount;
      this.setState({
        itemAmount: itemAmount
      });
    }
  };

  addToItems = () => {
    let items = JSON.parse(localStorage.getItem("User Items")) || [];
    items[this.props.id].amount++;
    localStorage.setItem("User Items", JSON.stringify(items));
  };

  subtractFromItems = () => {
    let items = JSON.parse(localStorage.getItem("User Items")) || [];
    items[this.props.id].amount--;
    localStorage.setItem("User Items", JSON.stringify(items));
  };

  plusOne() {
    if (this.state.itemAmount > 20) {
      alert("umm...are you sure?");
    } else {
      this.setState({ itemAmount: this.state.itemAmount + 1 });
      this.addToItems();
    }
  }

  minusOne() {
    if (this.state.itemAmount > 1) {
      this.setState({ itemAmount: this.state.itemAmount - 1 });
      this.subtractFromItems();
    }
  }

  render() {
    return (
      <div style={{ display: "inline" }}>
        <GeneralButton
          action="+"
          variant="outline-secondary"
          onClick={this.plusOne}
        />
        <div
          style={{
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: "20%"
          }}
        >
          {this.state.itemAmount}
        </div>
        <GeneralButton
          action="-"
          variant="outline-secondary"
          onClick={this.minusOne}
        />
      </div>
    );
  }
}

export default CheckOutQuantity;
