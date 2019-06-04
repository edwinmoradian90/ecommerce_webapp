import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import setAuthToken from "../helpers/setAuthToken";

class SlideDownModalLogin extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      loggedIn: false,
      userInfo: "",
      email: "",
      password: "",
      name: ""
    };
  }

  handleClose() {
    this.setState({ show: false });
    this.props.sidebarClose();
  }

  handleShow() {
    this.setState({ show: true });
  }

  onChange = e => {
    e.preventDefault();
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      console.log(this.state)
    );
  };

  onSubmit = e => {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(user);

    axios
      .post("/api/users/login", user)
      .then(res => {
        if (res.data.success) {
          const { token } = res.data;
          localStorage.setItem("jwtToken", JSON.stringify(token));
          setAuthToken(token);
          this.setState({ loggedIn: true }, () => {
            console.log(res);
            this.handleClose();
            this.props.logIn();
            this.props.history.push("/");
          });
        }
      })
      .catch(err => console.log(err));
  };

  getUserInfo = () => {
    axios.get("/api/users/current").then(user => {
      this.setState({ name: user.data.name }, () => {
        console.log(this.state.name);
      });
    });
  };

  render() {
    return (
      <>
        <Button variant={this.props.variant} onClick={this.handleShow}>
          {this.props.buttonName}
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    onChange={this.onChange}
                    type="email"
                    placeholder="Enter email"
                    name="email"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <React.Fragment>
              <Button type="submit" variant="primary" onClick={this.onSubmit}>
                Submit
              </Button>

              <Button variant="outline-primary" onClick={this.handleClose}>
                Close
              </Button>
            </React.Fragment>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(SlideDownModalLogin);
