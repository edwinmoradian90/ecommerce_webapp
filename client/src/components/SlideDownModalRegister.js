import React from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import axios from "axios";

class SlideDownModalRegister extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      registered: false,
      userFirstName: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password2: ""
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

    let newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    console.log(newUser);

    axios
      .post("api/users/register", newUser)
      .then(user => {
        let userFirstName = user.data.first_name;
        this.setState(
          { registered: true, userFirstName: userFirstName },
          () => {
            console.log(user);
          }
        );
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <Button variant={this.props.variant} onClick={this.handleShow}>
          {this.props.buttonName}
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            {this.state.registered ? (
              <Modal.Title>Almost there..</Modal.Title>
            ) : (
              <Modal.Title>{this.props.modalTitle}</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            {this.state.registered ? (
              <div>
                <h1>
                  Great you're good to go, {this.state.userFirstName}. Just
                  confirm your email and log in!
                </h1>
              </div>
            ) : (
              <div>
                <Form onSubmit={this.props.onSubmit}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName">
                      <Form.Control
                        onChange={this.onChange}
                        type="text"
                        placeholder="First name"
                        name="first_name"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                      <Form.Control
                        onChange={this.onChange}
                        type="text"
                        placeholder="Last name"
                        name="last_name"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Group controlId="formGridEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={this.onChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.onChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridPassword2">
                    <Form.Control
                      name="password2"
                      type="password"
                      placeholder="Confirm password"
                      onChange={this.onChange}
                    />
                  </Form.Group>
                </Form>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            {this.state.registered ? (
              <Button onClick={this.handleClose} variant="success">
                Okay!
              </Button>
            ) : (
              <React.Fragment>
                <Button type="submit" variant="primary" onClick={this.onSubmit}>
                  Submit
                </Button>

                <Button variant="outline-primary" onClick={this.handleClose}>
                  Close
                </Button>
              </React.Fragment>
            )}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default SlideDownModalRegister;
