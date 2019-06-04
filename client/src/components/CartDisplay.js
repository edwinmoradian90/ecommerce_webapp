import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import CheckOutQuantity from "./CheckOutQuantity";

class CartDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      itemAmount: 0
    };
  }

  getAmount = itemAmount => {
    this.setState({ itemAmount: itemAmount });
  };

  iteratorStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  };

  render() {
    if (this.props.item.length === 0) {
      return <h3> Nothing here...</h3>;
    } else {
      return (
        <React.Fragment>
          <Table>
            <tbody>
              <tr key={this.props.id} id={this.props.id}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <td key={this.props.id}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <img src={this.props.item.img} height={100} alt="nice" />

                      <Button
                        style={{ fontWeight: 250, fontSize: "13px" }}
                        variant="danger"
                        onClick={() => {
                          this.props.removeItem(this.props.item.id);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </td>
                  <td>
                    <h3 style={{ fontWeight: 250, textAlign: "left" }}>
                      {this.props.item.name}
                    </h3>

                    <>{this.props.item.price}</>
                  </td>
                  <td style={this.iteratorStyle}>
                    <CheckOutQuantity
                      {...this.props}
                      itemAmount={this.props.itemAmount}
                      id={this.props.id}
                    />
                  </td>
                </div>
              </tr>
            </tbody>
          </Table>
        </React.Fragment>
      );
    }
  }
}

export default CartDisplay;
