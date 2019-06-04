import React from "react";
import { Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = props => {
  return (
    <div className="Nav">
      <div className="Container">
        <Container>
          <ul className="Nav-items">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/categories">Products</Link>
            </li>
            <li>
              <Link to="/user/account">Account</Link>
            </li>
            <li>
              <Link to="/home">FAQ</Link>
            </li>
            <li>
              <Link to="/home">About Us</Link>
            </li>
          </ul>
        </Container>
        <h5
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            fontWeight: "100",
            fontSize: ".8em"
          }}
        >
          copyright Store 2019
        </h5>
      </div>
    </div>
  );
};

export default Footer;
