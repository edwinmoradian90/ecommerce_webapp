import React, { Component } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import jwt_decode from "jwt-decode";
import "./Navigation.css";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false,
      loggedIn: false,
      isAdmin: false,
      dropDown: false,
      inCartTotal: 0,
      currentUser: "",
      hovering: false
    };
  }

  componentDidMount = () => {
    this.logIn();
    this.getCartItems();
    document.addEventListener("click, keydown", this.getCartItems());
  };

  componentWillUpdate = prevProps => {
    if (
      this.props.logInStatus &&
      prevProps.logInStatus !== this.props.logInStatus
    ) {
      this.logOut();
    }
  };

  onMouseEnter = () => {
    this.setState({ hovering: true });
  };

  onMouseLeave = () => {
    this.setState({ hovering: false });
  };

  getCartItems = () => {
    let items = JSON.parse(localStorage.getItem("User Items")) || null;
    if (items) {
      let inCartTotal = items
        .map(item => item.amount)
        .reduce((acc, a) => {
          return acc + a;
        });
      this.setState({ inCartTotal });
      console.log(inCartTotal);
    }
  };

  dropDown = () => {
    this.setState({ dropDown: !this.state.dropDown }, () => {
      console.log(this.state.dropDown);
    });
  };

  logIn = () => {
    const userToken = JSON.parse(localStorage.getItem("jwtToken")) || "";
    if (userToken) {
      const currentUser = jwt_decode(userToken);

      this.setState({ currentUser: currentUser, loggedIn: true }, () => {
        console.log(this.state.currentUser);
        this.props.loggedIn(this.state.loggedIn);
        const isAdmin = this.checkAdmin(currentUser);

        if (isAdmin) {
          this.setState({ isAdmin: true }, () => {
            this.props.isAdmin(this.state.isAdmin);
            this.props.history.push("/dashboard");
            console.log("use your powers wisely...");
          });
        }
      });
    }
  };

  checkAdmin = currentUser => {
    let isAdmin = currentUser.isAdmin;
    if (isAdmin) {
      return true;
    } else {
      return false;
    }
  };

  logOut = () => {
    localStorage.removeItem("jwtToken");
    this.setState({ currentUser: "", loggedIn: false, isAdmin: false }, () => {
      this.props.isAdmin(this.state.isAdmin);
      this.props.history.push("/");
    });
  };

  sidebarOpen = () => {
    this.setState({ sidebarOpen: true });
  };

  sidebarClose = () => {
    this.setState({ sidebarOpen: false });
  };
  render() {
    const style = {
      width: this.state.hovering ? "22px" : "20px",
      height: this.state.hovering ? "2px" : "1px",
      backgroundColor: this.state.hovering ? "white" : "grey",
      margin: "6px 0px"
    };

    return (
      <div>
        <Navbar id="navbar" bg="dark" variant="dark">
          {this.state.sidebarOpen ? (
            <Sidebar
              sidebarOpen={this.state.sidebarOpen}
              sidebarClose={this.sidebarClose}
              userName={this.state.currentUser.first_name}
              loggedIn={this.state.loggedIn}
              logIn={this.logIn}
              logOut={this.logOut}
            />
          ) : null}
          <Container>
            <Navbar.Brand
              style={{
                display: "flex",
                flexDirection: "row"
              }}
            >
              <Button
                style={{ cursor: "pointer", marginLeft: "20px" }}
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseLeave}
                onClick={this.sidebarOpen}
                variant="outline-light"
              >
                <div style={style} />
                <div style={style} />
                <div style={style} />
              </Button>

              <Link style={{ marginLeft: "20px", marginTop: "4px" }} to="/">
                Store
              </Link>

              <Link
                id="products"
                style={{ marginLeft: "15px", marginTop: "4px" }}
                to="/categories"
              >
                Products
              </Link>
            </Navbar.Brand>
            <Nav className="ml-auto">
              {this.state.loggedIn ? (
                <h5
                  id="greetings"
                  style={{
                    color: "white",
                    paddingRight: "40px",
                    fontWeight: 300,
                    font: "20px",
                    paddingTop: "7px"
                  }}
                >
                  Welcome, {this.state.currentUser.first_name}
                </h5>
              ) : null}
            </Nav>
            <Nav>
              <React.Fragment>
                <Link
                  style={{ paddingRight: "15px", fontSize: "20px" }}
                  to="/cart"
                >
                  Cart
                </Link>
              </React.Fragment>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Navigation);
