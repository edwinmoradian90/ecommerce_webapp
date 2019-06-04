import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

class PostProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      name: "",
      img: "",
      description: "",
      price: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();

    axios
      .post("/api/products/", {
        category: this.state.category,
        name: this.state.name,
        img: this.state.img,
        description: this.state.description,
        price: this.state.price
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.setState(
      {
        category: "",
        name: "",
        img: "",
        description: "",
        price: ""
      },
      () => {
        this.forceUpdate();
      }
    );
  };

  onChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };
  style = {
    width: "30em"
  };
  render() {
    return (
      <div style={this.style}>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Category">
            <Form.Control
              onChange={this.onChange}
              placeholder="Category"
              name="category"
            />
          </Form.Group>
          <Form.Group controlId="Name">
            <Form.Control
              onChange={this.onChange}
              placeholder="Name"
              name="name"
            />
          </Form.Group>
          <Form.Group controlId="Image">
            <Form.Control
              onChange={this.onChange}
              placeholder="Image"
              name="img"
            />
          </Form.Group>
          <Form.Group controlId="Description">
            <Form.Control
              onChange={this.onChange}
              as="textarea"
              rows="3"
              placeholder="Description"
              name="description"
            />
          </Form.Group>
          <Form.Group controlId="Price">
            <Form.Control
              onChange={this.onChange}
              placeholder="Price"
              name="price"
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default PostProduct;
