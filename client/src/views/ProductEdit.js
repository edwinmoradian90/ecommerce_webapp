import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class ProductEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      featured: "",
      onSale: "",
      instock: "",
      delete: false
    };
  }

  componentDidMount = () => {
    axios
      .get(`/api/products/${this.props.match.params.product}`)
      .then(product => {
        this.setState(
          {
            featured: product.data.featured,
            onSale: product.data.onsale,
            instock: product.data.instock
          },
          () => {
            console.log(product.data);
          }
        );
      });
  };

  isFeatured = e => {
    e.preventDefault();
    if (this.state.featured === false) {
      this.setState({ featured: true });
    } else {
      this.setState({ featured: false });
    }
    axios
      .put(
        `/api/products/dashboard/featured/${this.props.match.params.product}`
      )
      .then(res => res.data)
      .catch(err => console.log(err));
  };

  onSale = e => {
    e.preventDefault();
    if (this.state.onSale === false) {
      this.setState({ onSale: true });
    } else {
      this.setState({ onSale: false });
    }

    axios
      .put(`/api/products/dashboard/onsale/${this.props.match.params.product}`)
      .then(res => res.data)
      .catch(err => console.log(err));
  };

  instock = e => {
    e.preventDefault();
    if (this.state.instock === false) {
      this.setState({ instock: true });
    } else {
      this.setState({ instock: false });
    }

    axios
      .put(`/api/products/dashboard/instock/${this.props.match.params.product}`)
      .then(res => res.data)
      .catch(err => console.log(err));
  };

  goBack = () => {
    this.props.history.push("/dashboard/products");
  };

  productDelete = e => {
    confirmAlert({
      title: "Confirm to delete",
      message:
        "Are you sure you want to delete " +
        this.props.match.params.product +
        "?",
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            axios
              .delete(
                `/api/products/dashboard/${this.props.match.params.product}`
              )
              .then(res => console.log(res))
              .catch(err => console.log(err));
            console.log(`Murdered ${this.props.match.params.product}`);
            this.props.history.push("/dashboard/products");
          }
        },
        {
          label: "Cancel",
          onClick: () => {
            console.log(`${this.props.match.params.product} NOT deleted..`);
          }
        }
      ]
    });
  };

  render() {
    return (
      <div>
        <div>{this.state.alert}</div>

        <h1>Editing Options</h1>
        <h3>{this.props.match.params.product}</h3>
        {this.state.featured ? (
          <Button onClick={this.isFeatured} variant="danger">
            Remove from featured
          </Button>
        ) : (
          <Button onClick={this.isFeatured} variant="success">
            Add to featured
          </Button>
        )}

        {this.state.onSale ? (
          <Button onClick={this.onSale} variant="danger">
            Remove from Sale Items
          </Button>
        ) : (
          <Button onClick={this.onSale} variant="warning">
            Add to sale items
          </Button>
        )}

        {this.state.instock ? (
          <Button onClick={this.instock} variant="danger">
            Mark as out of stock
          </Button>
        ) : (
          <Button onClick={this.instock} variant="info">
            Mark as in stock
          </Button>
        )}

        <Button onClick={this.productDelete} variant="danger">
          DELETE
        </Button>
        <Button onClick={this.goBack}>Back</Button>
      </div>
    );
  }
}

export default withRouter(ProductEdit);
