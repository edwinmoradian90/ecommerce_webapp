import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class GeneralButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  render() {
    return (
      <React.Fragment>
        <Button variant={this.props.variant} onClick={this.props.onClick}>
          {this.props.action}
        </Button>
      </React.Fragment>
    );
  }
}

export default withRouter(GeneralButton);
