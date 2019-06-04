import React, { Component } from "react";
import ChecKOutDisplay from "../components/ChecKOutDisplay";
import { withRouter } from "react-router-dom";
import CheckOutPrice from "../components/CheckOutPrice";
import PurchaseForm from "../components/PurchaseForm";
import { Container } from "react-bootstrap";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.finishUp = this.finishUp.bind(this);
    this.backToCart = this.backToCart.bind(this);
    this.state = {
      finishUp: false
    };
  }

  finishUp() {
    this.setState({ finishUp: true }, () => {
      console.log("Finished: " + this.state.finishUp);
    });
  }

  backToCart() {
    this.props.history.push("/cart");
  }
  render() {
    const style = {
      display: "flex",
      justifyContent: "flex-end"
    };

    const total = {
      display: "flex",
      flexDirection: "row"
    };

    const formStyle = {
      paddingRight: "200px"
    };
    return (
      <Container>
        <>
          <h1 style={{ margin: "20px", marginTop: "40px", fontWeight: 250 }}>
            Checkout
          </h1>
          <div style={style}>
            <div style={formStyle}>
              <PurchaseForm />
            </div>
            <div>
              <CheckOutPrice />
              <ChecKOutDisplay />
              <div style={total} />
            </div>
          </div>
        </>
      </Container>
    );
  }
}

export default withRouter(Checkout);
