import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "./Help.css";
import axios from "axios";
import setAuthToken from "../../helpers/setAuthToken";

class Help extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      isLoaded: false
    };
  }

  componentDidMount = () => {
    let token = JSON.parse(localStorage.getItem("jwtToken"));
    if (token) {
      setAuthToken(token);
      axios
        .get(`/api/users/current`)
        .then(user => {
          let { first_name } = user.data;
          this.setState({ first_name, isLoaded: true });
        })
        .catch(err => console.log(err));
    }
  };
  render() {
    return (
      <div>
        <div id="help-bar">
          <div>
            <Container>
              <h1 className="heading">
                {this.state.first_name
                  ? `Hi, ${this.state.first_name}. Have questions or concerns?`
                  : `Hi. Have questions or concerns?`}
              </h1>
            </Container>
          </div>
        </div>
        <Container>
          <h3 className="heading">Maybe our FAQ can help.</h3>
        </Container>
        <section className="faq">
          <p>Where is my order?</p>
          <p>What if I'm not home when my order arrives?</p>
          <p>I made an order by mistake, how do I cancel it?</p>
          <p>What if I live outside of the USA?</p>
          <p>What is your general return policy?</p>
          <p>I don't want to use Paypal, is there another way to order?</p>
          <p>Product was not as described, what do I do?</p>
          <p>Why are you so amazing, Edwin?</p>
        </section>
      </div>
    );
  }
}

export default Help;
