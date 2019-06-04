import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Sidebar.css";
import MainMenu from "./MainMenu";
import UserSettings from "./UserSettings";

class Sidebar extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sidebarOpen: false,
      settings: false,
      orders: false,
      update: false,
      address: false,
      help: false,
      deleteAccount: false
    };
  }

  settings = () => {
    this.setState({ settings: true }, () => {
      console.log("Settings open: " + this.state.settings);
    });
  };

  updateUserInformation = () => {
    this.setState({ update: true }, () => {
      console.log(`Update page open: ${this.state.update}`);
      this.props.history.push(`/user/account`);
      this.props.sidebarClose();
    });
  };

  updateAddresses = () => {
    this.setState({ address: true }, () => {
      console.log(`Update address page open: ${this.state.address}`);
      this.props.history.push("/user/addresses");
      this.props.sidebarClose();
    });
  };

  orders = () => {
    this.setState({ orders: true }, () => {
      this.props.history.push("/user/orders");
      this.props.sidebarClose();
    });
  };

  help = () => {
    this.setState({ help: true }, () => {
      this.props.history.push("/user/help");
      this.props.sidebarClose();
    });
  };

  back = () => {
    this.setState({ settings: false }, () => {
      console.log("Settings is open: " + this.state.settings);
    });
  };

  render() {
    return (
      <>
        {!this.state.settings ? (
          <MainMenu {...this.props} settings={this.settings} help={this.help} />
        ) : (
          <UserSettings
            {...this.props}
            back={this.back}
            help={this.help}
            orders={this.orders}
            updateUserInformation={this.updateUserInformation}
            updateAddresses={this.updateAddresses}
          />
        )}
      </>
    );
  }
}
export default withRouter(Sidebar);
