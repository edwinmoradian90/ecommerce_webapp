import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  Card,
  Container,
  Collapse,
  Spinner
} from "react-bootstrap";

import { withRouter } from "react-router-dom";
class ProductListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      style: { width: "18rem", height: 270 },
      isLoaded: false
    };
  }

  componentDidMount = () => {
    this.setState({ isLoaded: true });
  };

  onMouseEnter = () => {
    this.setState({
      hover: true,
      style: {
        width: "19rem",
        height: 300,
        transition: ".3s",
        boxShadow: "3px 2px 20px grey",
        borderRadius: "3%"
      }
    });
  };

  onMouseOut = () => {
    this.setState({
      hover: false,
      style: { height: 270, width: "18rem", transition: ".3s" }
    });
  };

  render() {
    const product = this.props.product;
    const onClick = () => {
      this.props.history.push(`/products/${product.name}`);
    };

    return (
      <>
        {this.state.isLoaded ? (
          <div className="product-list-item">
            <Container onClick={onClick}>
              <Card style={{ width: "18rem" }} onMouseOut={this.onMouseOut}>
                <Card.Img
                  style={this.state.style}
                  variant="top"
                  height={270}
                  src={product.img}
                  onMouseEnter={this.onMouseEnter}
                />
                <Collapse in={this.state.hover}>
                  <Card.Body value={product.name} onClick={onClick}>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                  </Card.Body>
                </Collapse>
                <ListGroup
                  className="list-group-flush"
                  onMouseEnter={this.onMouseEnter}
                >
                  <ListGroupItem>${product.price}</ListGroupItem>
                </ListGroup>
              </Card>
            </Container>
          </div>
        ) : (
          <Spinner animation="border" />
        )}
      </>
    );
  }
}

export default withRouter(ProductListItem);
