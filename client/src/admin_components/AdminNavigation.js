import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { NavDropdown, Container, Nav, Navbar } from "react-bootstrap";

class AdminNavigation extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Link to="/dashboard">Dashboard</Link>
            <NavDropdown title="Products" id="nav-dropdown">
              <NavDropdown.Item
                onClick={() => {
                  this.props.history.push("/dashboard/products/add");
                }}
              >
                Add
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  this.props.history.push("/dashboard/products/update");
                }}
              >
                Update
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  this.props.history.push("/dashboard/products/delete");
                }}
              >
                Delete
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  this.props.history.push("/dashboard/products");
                }}
              >
                View All
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Users">
              <NavDropdown.Item>Add</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  this.props.history.push("/dashboard/users");
                }}
              >
                View all
              </NavDropdown.Item>
            </NavDropdown>

            <Nav className="mr-auto" />
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(AdminNavigation);
