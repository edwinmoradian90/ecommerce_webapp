import React, { Component } from "react";
import axios from "axios";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import setAuthToken from "../helpers/setAuthToken";
import "./Settings.css";

class Settings extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      id: ""
    };
  }

  componentDidMount = () => {
    let token = JSON.parse(localStorage.getItem("jwtToken"));
    if (token) {
      setAuthToken(token);
    }
    axios.get("/api/users/current").then(user => {
      let { name, email, id } = user.data;
      this.setState({ name, email, id }, () => {
        console.log(this.state);
      });
    });
  };
  render() {
    return (
      <div>
        <Container>
          <h1 style={{ padding: "20px" }}>Settings</h1>

          <ListGroup id="list-group">
            <Row id="row">
              <Col id="col" xs={12} md={4}>
                <ListGroup.Item
                  className="list-group-item"
                  name="View and track your orders"
                >
                  Your orders
                </ListGroup.Item>
              </Col>
              <Col id="col" xs={12} md={4}>
                <ListGroup.Item
                  className="list-group-item"
                  name="Cancel orders"
                >
                  Cancel an order
                </ListGroup.Item>
              </Col>

              <Col id="col" xs={12} md={4}>
                <ListGroup.Item
                  onClick={e => {
                    this.props.history.push(
                      `/settings/${e.target.getAttribute("name")}`
                    );
                  }}
                  name="update_account"
                >
                  Update account
                </ListGroup.Item>
              </Col>
            </Row>
            <Row>
              <Col id="col" xs={12} md={4}>
                <ListGroup.Item
                  onClick={e => {
                    this.props.history.push(
                      `/settings/${e.target.getAttribute("name")}`
                    );
                  }}
                  name="update_addresses"
                >
                  Update addresses
                </ListGroup.Item>
              </Col>
              <Col id="col" xs={12} md={4}>
                <ListGroup.Item name="Update profile picture">
                  Update profile picture
                </ListGroup.Item>
              </Col>

              <Col id="col" xs={12} md={4}>
                <ListGroup.Item name="Delete account">
                  Delete account
                </ListGroup.Item>
              </Col>
            </Row>
          </ListGroup>
        </Container>
      </div>
    );
  }
}

export default Settings;
