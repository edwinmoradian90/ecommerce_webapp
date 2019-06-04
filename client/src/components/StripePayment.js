import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { Button } from "react-bootstrap";

class StripePayment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: "",
      title: ""
    };
  }

  render() {
    const onToken = token => {
      console.log("Stripe Token", token, this.props);
    };

    return (
      <StripeCheckout
        name="Store "
        description={this.state.title}
        token={onToken}
        amount={this.props.total * 100}
        stripeKey="pk_test_U1UOM3xqOl9mU5smnBP9KB9m"
      >
        {this.props.children || (
          <span>
            <Button variant="secondary">Buy Now</Button>
          </span>
        )}
      </StripeCheckout>
    );
  }
}
export default StripePayment;
