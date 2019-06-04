import React, { Component } from "react";
import { Jumbotron, Container } from "react-bootstrap";

export default class PageTitle extends Component {
  render() {
    return (
      <React.Fragment>
        <Jumbotron
          fluid
          style={{
            backgroundColor: "white",
            boxShadow: "2px 2px 10px lightgrey"
          }}
        >
          <Container>
            <h1
              style={{
                fontWeight: 250,
                fontSize: "3.5em"
              }}
            >
              {this.props.name}
            </h1>
            <p style={{ color: "#777" }}>{this.props.description}</p>
          </Container>
        </Jumbotron>
      </React.Fragment>
    );
  }
}
