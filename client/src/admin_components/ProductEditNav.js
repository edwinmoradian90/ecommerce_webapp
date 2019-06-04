import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class ProductEditNav extends Component {
  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="white" id="dropdown-basic">
          Sort
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={this.props.sortFeatured}>
            Featured only
          </Dropdown.Item>
          <Dropdown.Item onClick={this.props.sortInstock}>
            In stock
          </Dropdown.Item>
          <Dropdown.Item onClick={this.props.sortNotInstock}>
            Not in stock
          </Dropdown.Item>
          <Dropdown.Item onClick={this.props.sortPriceLeastToGreatest}>
            Price(ascending)
          </Dropdown.Item>
          <Dropdown.Item onClick={this.props.sortPriceGreatestToLeast}>
            Price(descending)
          </Dropdown.Item>
          <Dropdown.Item onClick={this.props.uploadDate}>
            Upload date
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default withRouter(ProductEditNav);
