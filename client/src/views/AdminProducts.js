import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AdminProductList from "../admin_components/AdminProductList";
import { Card } from "react-bootstrap";

class AdminProducts extends Component {
  render() {
    return (
      <div>
        <Card body>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <h1>Products</h1>
          </div>
          <AdminProductList />
        </Card>
      </div>
    );
  }
}

export default withRouter(AdminProducts);
