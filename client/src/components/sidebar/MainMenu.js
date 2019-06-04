import React from "react";
import SlideDownModalLogin from "../SlideDownModalLogin";
import SlideDownModalRegister from "../SlideDownModalRegister";
import { Link } from "react-router-dom";
import "../sidebar/Sidebar.css";

function MainMenu(props) {
  let visibility = "hide";
  if (props.sidebarOpen) {
    visibility = "show";
  }

  let close = props.sidebarClose;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <div id="sidebar" className={visibility}>
          <div id="header">
            <div
              className="container"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "spaced-evenly",
                paddingTop: "13px"
              }}
            >
              {props.loggedIn ? (
                <h3 style={{ fontWeight: 250 }}>Hello, {props.userName}</h3>
              ) : (
                <h3
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px"
                  }}
                >
                  <SlideDownModalLogin
                    style={{ display: "none" }}
                    modalTitle="Log in"
                    buttonName="Log in"
                    variant="info"
                    sidebarClose={props.sidebarClose}
                    logIn={props.logIn}
                  />{" "}
                  or{" "}
                  <SlideDownModalRegister
                    variant="outline-success"
                    modalTitle="Register"
                    buttonName="Register"
                    sidebarClose={props.sidebarClose}
                  />
                </h3>
              )}

              <h4 onClick={close}>X</h4>
            </div>
          </div>
          <div id="list" className="list">
            <Link className="menu-item" onClick={close} to="/">
              <span>
                <span>Home</span>
              </span>
            </Link>
            <Link className="menu-item" onClick={close} to="/categories">
              <span>Products</span>
            </Link>
            <Link className="menu-item" onClick={close} to="/cart">
              <span>Cart</span>
            </Link>
            {props.loggedIn ? (
              <div className="menu-item" onClick={props.settings}>
                <span>Your Account</span>
              </div>
            ) : null}
            <Link className="menu-item" onClick={props.help} to="#">
              <span>Help</span>
            </Link>
            {props.loggedIn ? (
              <span
                className="menu-item"
                onClick={() => {
                  props.logOut();
                  props.sidebarClose();
                }}
                style={{
                  color: "red",
                  marginTop: "18px",
                  borderTop: ".1px solid lightgrey",
                  cursor: "pointer"
                }}
              >
                Log out
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
