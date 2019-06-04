import React, { Component } from "react";
import { Dropdown, DropdownButton, ButtonToolbar } from "react-bootstrap";

class DropDown extends Component {
  render() {
    return (
      <div>
        <ButtonToolbar>
          <DropdownButton title={this.props.title} variant={this.props.variant}>
            <Dropdown.Item>{this.props.list1}</Dropdown.Item>

            <Dropdown.Item>{this.props.list2}</Dropdown.Item>
            <Dropdown.Item>{this.props.list3}</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item style={{ color: "red" }} onClick={this.props.logOut}>
              {this.props.listSeparate}
            </Dropdown.Item>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}

export default DropDown;
