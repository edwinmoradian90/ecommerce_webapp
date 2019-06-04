import React from "react";
import SlideDownModalLogin from "../SlideDownModalLogin";
import SlideDownModalRegister from "../SlideDownModalRegister";
import "../sidebar/Sidebar.css";

function UserSettings(props) {
  let visibility = "hide";
  if (props.sidebarOpen) {
    visibility = "show";
  }

  let close = props.sidebarClose;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end", fontWeight: 250 }}>
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
            <div className="menu-item" onClick={props.back}>
              <span>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "400"
                  }}
                >
                  {"<  Main Menu"}
                </span>
              </span>
            </div>

            <div className="menu-item" onClick={props.orders}>
              <span>Your Orders</span>
            </div>
            <div className="menu-item" onClick={props.updateUserInformation}>
              <span>Your Account Information </span>
            </div>
            <div className="menu-item" onClick={props.updateAddresses}>
              <span>Your Addresses</span>
            </div>
            {props.loggedIn ? (
              <div className="menu-item" onClick={props.help}>
                <span>Help</span>
              </div>
            ) : null}
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
    </>
  );
}

export default UserSettings;
