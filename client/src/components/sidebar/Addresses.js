import React, { Component } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import "./Addresses.css";
import setAuthToken from "../../helpers/setAuthToken";
import AddressDisplay from "./AddressDisplay";
import { withRouter } from "react-router-dom";
import AddressAdder from "./AddressAdder";

class UpdateAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      update: "",
      address: "",
      name: "",
      userAddress: "",
      userAddress2: "",
      zip: "",
      state: "",
      city: "",
      id: "",
      edit: false,
      addAddress: false,
      isLoaded: false
    };
  }

  componentDidMount = () => {
    let token = JSON.parse(localStorage.getItem("jwtToken"));
    if (token) {
      setAuthToken(token);
    }

    axios.get("/api/users/current").then(user => {
      console.log(user);
      let address = user.data.address;
      let id = user.data.id;
      if (address === null) {
        console.log("No address");
        this.setState({ isLoaded: true, id });
      } else {
        this.setState({ address, id, isLoaded: true }, () => {
          console.log(this.state.address);
        });
      }
    });
  };

  onChange = e => {
    this.state.edit
      ? this.setState({ [e.target.name]: e.target.value })
      : this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    let { userAddress, userAddress2, name, zip, state, city } = this.state;

    if (this.state.edit) {
      let id = this.props.match.params.id;
      let address = this.state.address;

      let updated = {
        userAddress,
        userAddress2,
        name,
        zip,
        state,
        city
      };
      address.splice(id, 1);
      address.splice(id, 0, updated);

      this.setState({ address }, () => {
        console.log(this.state.address);
        axios
          .patch(`/api/users/update/${this.state.id}`, this.state.address)
          .then(res => console.log(res))
          .catch(err => console.log(err));
      });

      this.back();
    } else {
      let address = [
        ...this.state.address,

        {
          userAddress: userAddress,
          userAddress2: userAddress2,
          name: name,
          zip: zip,
          state: state,
          city: city
        }
      ];
      this.setState({ address }, () => {
        console.log(this.state.address);
        axios
          .patch(`/api/users/update/${this.state.id}`, this.state.address)
          .then(res => console.log(res, this.props.match))
          .catch(err => console.log(err));
      });

      this.back();
    }
  };

  edit = e => {
    let id = e.target.getAttribute("id");
    this.props.history.push(`/user/addresses/${id}`);
    let {
      userAddress,
      userAddress2,
      name,
      city,
      state,
      zip
    } = this.state.address[id];
    this.setState(
      { edit: true, userAddress, userAddress2, name, city, state, zip },
      () => console.log(this.state.edit)
    );
    console.log(id, this.state.address[this.props.match.params.id]);
  };

  addAddress = () => {
    this.setState({ addAddress: true });
  };

  deleteAddress = e => {
    let id = e.target.getAttribute("id");
    let address = this.state.address;
    address.splice(id, 1);
    this.setState({ address }, () => {
      console.log(this.state.address);
      axios
        .patch(`/api/users/update/${this.state.id}`, this.state.address)
        .then(res => console.log(res, this.props.match))
        .catch(err => console.log(err));
    });
  };

  loadingFailed = () => {
    this.props.history.push("/");
  };

  back = () => {
    this.setState({ addAddress: false, edit: false });
  };
  render() {
    return (
      <div>
        {this.state.isLoaded ? (
          <Container>
            <h1
              style={{
                marginTop: "40px",
                marginBottom: "20px",
                fontWeight: 250
              }}
            >
              {this.state.addAddress ? "Add Address" : "Your Addresses"}
            </h1>
            {this.state.address.length !== 0 &&
            !this.state.addAddress &&
            !this.state.edit ? (
              <div>
                {this.state.address.map((address, i) => (
                  <div key={i}>
                    <AddressDisplay
                      title={address.name}
                      id={i}
                      address={address.userAddress}
                      city={address.city}
                      state={address.state}
                      zip={address.zip}
                      edit={this.edit}
                      deleteAddress={this.deleteAddress}
                      link="edit"
                      link2="delete"
                    />

                    {console.log(address)}
                  </div>
                ))}

                <Button
                  onClick={this.addAddress}
                  style={{ marginTop: "40px", fontWeight: 250 }}
                  variant="info"
                >
                  Add another address
                </Button>
              </div>
            ) : (
              <>
                {!this.state.addAddress && !this.state.edit ? (
                  <div>
                    You do not have a saved address.{" "}
                    <span onClick={this.addAddress} id="address-link">
                      Save one here
                    </span>
                  </div>
                ) : (
                  <>
                    {this.state.edit ? (
                      <AddressAdder
                        {...this.props}
                        back={this.back}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        editItem={
                          this.state.address[this.props.match.params.id]
                        }
                        edit={this.state.edit}
                      />
                    ) : (
                      <AddressAdder
                        {...this.props}
                        back={this.back}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </Container>
        ) : (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </div>
    );
  }
}

export default withRouter(UpdateAddress);
