import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Container,
  DropdownButton,
  Dropdown
} from "react-bootstrap";

class UserEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      date: "",
      isAdmin: "",
      loggedIn: "",
      edit: false
    };
  }

  componentDidMount = () => {
    axios.get(`/api/users/${this.props.match.params.user}`).then(user => {
      let {
        first_name,
        last_name,
        email,
        date,
        isAdmin,
        loggedIn,
        recentlyViewed
      } = user.data;
      this.setState(
        {
          first_name,
          last_name,
          email,
          date,
          isAdmin,
          loggedIn,
          recentlyViewed
        },

        () => {
          console.log(this.state.user);
        }
      );
    });
  };

  edit = e => {
    this.setState({ edit: true });
  };

  view = () => {
    this.setState({ edit: false });
  };

  save = () => {
    axios
      .put(`/api/users/update/${this.props.match.params.user}`, this.state)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });
  };

  back = () => {
    this.props.history.push("/dashboard/users");
  };

  render() {
    if (this.state.first_name === null) {
      return null;
    }
    return (
      <div>
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "30px 0 30px 0"
            }}
          >
            <h4>User Edit</h4>
            <DropdownButton
              id="dropdown-basic-button"
              title="Options"
              variant="info"
            >
              <Dropdown.Item onClick={this.view}>View</Dropdown.Item>
              <Dropdown.Item onClick={this.edit}>Edit</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item style={{ color: "red" }}>Delete</Dropdown.Item>
            </DropdownButton>
          </div>
          <h5>
            {this.state.edit ? (
              <Form>
                <Form.Group>
                  <Form.Control
                    onChange={this.onChange}
                    value={this.state.first_name}
                    name="first_name"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    onChange={this.onChange}
                    value={this.state.last_name}
                    name="last_name"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    onChange={this.onChange}
                    value={this.state.email}
                    name="email"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    onChange={this.onChange}
                    value={this.state.date}
                    name="date"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    onChange={this.onChange}
                    value={this.state.isAdmin}
                    name="isAdmin"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    onChange={this.onChange}
                    value={this.state.loggedIn}
                    name="loggedIn"
                  />
                </Form.Group>
              </Form>
            ) : (
              <ul>
                <li>{this.state.first_name}</li>
                <li>{this.state.last_name}</li>
                <li>{this.state.email}</li>
                <li>{this.state.date}</li>
                <li>{this.state.isAdmin}</li>
                <li>{this.state.loggedIn}</li>
              </ul>
            )}
          </h5>

          <Button variant="outline-info" onClick={this.save}>
            Save
          </Button>
          <Button variant="info" onClick={this.back}>
            Back
          </Button>
        </Container>
      </div>
    );
  }
}

export default UserEdit;
