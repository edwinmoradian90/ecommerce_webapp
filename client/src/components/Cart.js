import React, { Component } from "react";
import CartItems from "./CartItems";
import { Container } from "react-bootstrap";
import CheckOutPrice from "./CheckOutPrice";
import GeneralButton from "./GeneralButton";
import { withRouter } from "react-router-dom";
import axios from "axios";
import setAuthToken from "../helpers/setAuthToken";
import StripePayment from "./StripePayment";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.checkOut = this.checkOut.bind(this);
    this.continueShopping = this.continueShopping.bind(this);

    this.state = {
      initialAmount: 1,
      changedAmount: 0,
      checkoutInfo: "",
      button: true,
      loggedIn: false,
      total: ""
    };
  }

  componentDidMount = () => {
    console.log("component did mount");
    let token = JSON.parse(localStorage.getItem("jwtToken"));

    if (token) {
      setAuthToken(token);
      this.getUserInfo();
    }

    this.getCartInfo();
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log("component did update");
    let token = this.tokenChecker();
    console.log(token, prevState.loggedIn);
    if (prevState.loggedIn !== token) {
      this.getUserInfo();
    }
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log("will update");
    if (nextState === undefined) {
      this.setState({ button: false });
    }
  };

  tokenChecker = () => {
    let token = JSON.parse(localStorage.getItem("jwtToken"));
    if (token) {
      return true;
    } else {
      return false;
    }
  };

  checkOut() {
    this.props.history.push("/checkout");
  }

  continueShopping() {
    this.props.history.push("/");
  }

  getUserInfo = () => {
    axios.get("/api/users/current").then(user => {
      if (user) {
        this.setState({ loggedIn: true }, () => {
          console.log(this.state.loggedIn);
        });
      }
    });
  };

  getCartInfo = () => {
    let cartItems = JSON.parse(localStorage.getItem("User Items")) || [];
    if (cartItems.length === 0) {
      this.setState({ initialAmount: cartItems, button: false });
    } else {
      let initialAmount = cartItems.map(item => item.amount);

      this.setState({ initialAmount: initialAmount }, () => {
        console.log(this.state.initialAmount);
      });
    }
  };

  add = e => {
    e.preventDefault();
    this.setState({
      changedAmount: this.state.changedAmount + 1
    });
  };

  subtract = e => {
    e.preventDefault();

    this.setState({
      changedAmount: this.setState.changedAmount - 1
    });
  };

  getIndividualPrice = itemName => {
    this.setState({
      individualPrice: [itemName]
    });
  };

  getTotal = total => {
    this.setState({ total: total }, () => {
      console.log(this.state.total);
    });
  };

  render() {
    const cartItemsStyle = {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      backgroundColor: "white"
    };

    const button = {
      paddingTop: "30px"
    };
    return (
      <React.Fragment>
        <Container style={{ marginTop: "40px" }}>
          <div style={cartItemsStyle}>
            <CartItems
              add={this.add}
              subtract={this.subtract}
              individualPrice={this.individualPrice}
            />
            <div
              style={{
                backgroundColor: "white",
                width: "300px",
                height: "400px"
              }}
            >
              <div style={{ textAlign: "center" }}>
                <CheckOutPrice
                  getTotal={this.getTotal}
                  componentWillUpdate={this.componentWillUpdate}
                  amount={this.state.initialAmount}
                  changedAmount={this.state.changedAmount}
                />
              </div>
              <div style={button}>
                {this.state.button ? (
                  /*<GeneralButton
                    variant="light"
                    onClick={this.checkOut}
                    action="Check out"
                  /> */
                  <StripePayment
                    total={this.state.total}
                    loggedIn={this.state.loggedIn}
                    amount={this.state.initialAmount}
                    changedAmount={this.state.changedAmount}
                  />
                ) : null}

                <GeneralButton
                  variant="light"
                  onClick={this.continueShopping}
                  action="Continue shopping"
                />
              </div>
            </div>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(Cart);
