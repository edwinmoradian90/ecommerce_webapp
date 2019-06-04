import React, { Component } from "react";
import AccountInfo from "../components/sidebar/AccountInfo";
import Addresses from "../components/sidebar/Addresses";
import Orders from "../components/sidebar/Orders";
import Help from "../components/sidebar/Help";

class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      setting: ""
    };
  }

  componentDidMount = () => {
    this.setting();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.match.params.setting !== this.props.match.params.setting) {
      this.setting();
    } else {
      return null;
    }
  };

  setting = () => {
    let setting = this.props.match.params.setting;
    let content = {
      account: <AccountInfo />,
      addresses: <Addresses />,
      orders: <Orders />,
      help: <Help />
    };

    this.setState({ setting: content[setting] });
  };

  render() {
    return <div>{this.state.setting}</div>;
  }
}

export default Setting;
