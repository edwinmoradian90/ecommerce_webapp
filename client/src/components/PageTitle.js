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
                display: "flex",
                justifyContent: "center",
                fontWeight: 250,
                fontSize: "3.5em"
              }}
            >
              {this.props.name}
            </h1>
            <p
              style={{
                color: "#777",
                display: "flex",
                justifyContent: "center"
              }}
            >
              {this.props.description}
            </p>
          </Container>
        </Jumbotron>
      </React.Fragment>
    );
  }
}
