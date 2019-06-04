import React, { Component } from "react";
import axios from "axios";
import CategoryDisplay from "../components/CategoryDisplay";
import { Container, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PageTitle from "../components/PageTitle";

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: [],
      isLoaded: false
    };
  }

  componentDidMount = () => {
    axios.get(`/api/products/all`).then(products => {
      let productCategory = this.props.match.params.category;
      let category = products.data.filter(
        product => product.category === productCategory
      );
      this.setState({ category, isLoaded: true });
    });
  };

  viewProduct = e => {
    let product = e.target.getAttribute("name");
    let category = this.props.match.params.category;

    this.props.history.push(`/categories/${category}/${product}`);
  };

  upperCase = item => {
    let firstLetter = item.charAt(0).toUpperCase();
    let restOfString = item.slice(1);
    let upperCased = firstLetter + restOfString;
    return upperCased;
  };
  render() {
    let category = this.upperCase(this.props.match.params.category);
    return (
      <div>
        <PageTitle name={category} />
        {this.state.isLoaded ? (
          <>
            <Container style={{ display: "flex", flexDirection: "row" }}>
              {this.state.category.map((category, index) => (
                <Container key={index}>
                  <CategoryDisplay
                    viewProduct={this.viewProduct}
                    name={category.name}
                    description={category.description}
                    imgs={category.img}
                    price={category.price}
                  />
                </Container>
              ))}
            </Container>
          </>
        ) : (
          <Spinner
            style={{ position: "fixed", top: "50%", left: "50%" }}
            animation="border"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </div>
    );
  }
}

export default withRouter(Category);
