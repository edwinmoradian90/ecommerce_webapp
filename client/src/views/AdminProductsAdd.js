import React, { Component } from "react";
import PostProduct from "../admin_components/PostProduct";
import { Container } from "react-bootstrap";

class AdminProductsAdd extends Component {
  render() {
    return (
      <div>
        <Container>
          <h1>Products Add</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <PostProduct />
          </div>
        </Container>
      </div>
    );
  }
}

export default AdminProductsAdd;
