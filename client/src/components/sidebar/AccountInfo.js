import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Spinner
} from "react-bootstrap";
import GeneralInput from "./GeneralInput";
import axios from "axios";
import setAuthToken from "../../helpers/setAuthToken";
import bcrypt from "bcryptjs";

class UpdateUserInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      id: "",
      whichOne: "",
      passwordErrors: "",
      edit: false,
      isLoaded: false
    };
  }

  componentDidMount = () => {
    let token = JSON.parse(localStorage.getItem("jwtToken"));
    if (token) {
      setAuthToken(token);
    }
    axios.get("/api/users/current").then(user => {
      let { first_name, last_name, email, password, id } = user.data;
      this.setState(
        { first_name, last_name, email, password, id, isLoaded: true },
        () => {
          console.log(this.state);
        }
      );
    });
  };

  edit = e => {
    this.setState(
      { edit: true, whichOne: e.target.getAttribute("name") },
      () => {
        console.log(this.state.whichOne);
      }
    );
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  save = () => {
    axios
      .put(`/api/users/update/${this.state.id}`, this.state)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    this.setState({ whichOne: "" });
  };

  passwordValidation = () => {
    let passwordErrors = {};
    if (!bcrypt.compare(this.state.password, this.state.currentPassword)) {
      passwordErrors.oldPasswordsMatch =
        "Current password does not match your previous password";
    } else if (this.state.newPassword !== this.state.confirmPassword) {
      passwordErrors.newPasswordMatch =
        "Confirmation password does not match new password";
    } else if (this.state.newPassword === this.state.currentPassword) {
      passwordErrors.uniquePassword =
        "New password cannot match previous password";
    }
    if (passwordErrors.length !== 0) {
      this.setState({ passwordErrors }, () => {
        return false;
      });
    } else {
      console.log("Password criteria met");
      return true;
    }
  };

  passwordSave = () => {
    bcrypt.genSalt(10, (err, salt) => {
      let newPassword = this.state.newPassword;
      bcrypt.hash(newPassword, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        newPassword = hash;
        console.log(newPassword);
        this.setState({ password: newPassword, whichOne: "" }, () => {
          axios
            .put(`/api/users/update/${this.state.id}`, this.state)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        });
      });
    });
  };

  render() {
    const style = {
      display: "flex",
      flexDirection: "row",
      justifyContent: " space-between"
    };

    let options = [
      ["email", "Email: ", this.state.email],
      ["password", "Password: ", "Hidden"],
      ["first_name", "First name: ", this.state.first_name],
      ["last_name", "Last name: ", this.state.last_name]
    ];

    return (
      <Container>
        <h1 style={{ padding: "20px" }}>Update Account</h1>
        <ListGroup>
          {this.state.isLoaded ? (
            options.map((item, i) => (
              <ListGroupItem style={style} key={i}>
                {this.state.edit && this.state.whichOne === item[0] ? (
                  this.state.whichOne === "password" ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <GeneralInput
                        type="password"
                        name="currentPassword"
                        onChange={this.onChange}
                        text="Current password"
                      />
                      <GeneralInput
                        type="password"
                        name="newPassword"
                        onChange={this.onChange}
                        text="New password"
                      />
                      <GeneralInput
                        type="password"
                        name="confirmPassword"
                        onChange={this.onChange}
                        text="Confirm password"
                      />
                      <Button
                        onClick={this.passwordSave}
                        style={{ height: "38px" }}
                        variant="outline-success"
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <>
                      <GeneralInput
                        onChange={this.onChange}
                        name={item[0]}
                        text={item[1]}
                        value={item[2]}
                      />
                      <Button
                        style={{ height: "38px" }}
                        variant="outline-success"
                        onClick={this.save}
                      >
                        Save
                      </Button>
                    </>
                  )
                ) : (
                  <>
                    <h5 id={i} key={i}>
                      {item[1]}
                      {item[2]}
                    </h5>
                    <Button variant="info" name={item[0]} onClick={this.edit}>
                      Edit
                    </Button>
                  </>
                )}
              </ListGroupItem>
            ))
          ) : (
            <Spinner
              style={{ position: "fixed", left: "50%", top: "25%" }}
              animation="border"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
        </ListGroup>
      </Container>
    );
  }
}

export default UpdateUserInformation;
