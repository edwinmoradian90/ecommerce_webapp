import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class ImageOverlay extends Component {
  render() {
    console.log(this.props.img);
    return (
      <div>
        <Card className="bg-dark text-white">
          <Card.Img src={this.props.img} height={200} alt="Card image" />
          <Card.ImgOverlay />
        </Card>
      </div>
    );
  }
}

export default withRouter(ImageOverlay);
