import React, { Component } from "react";
import { Container, Spinner } from "react-bootstrap";
import axios from "axios";
import CategoriesDisplay from "../components/CategoriesDisplay";
import PageTitle from "../components/PageTitle";

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesAndImgs: [],
      isLoaded: false,
      category: false
    };
  }

  componentDidMount = () => {
    axios.get(`/api/products/all`).then(products => {
      let categoriesMap = products.data.map(product => product.category);
      let categories = [...new Set(categoriesMap)];
      let imgsMap = products.data.map(product => product.img);
      let imgs = [...new Set(imgsMap)];
      let categoriesAndImgs = [];
      for (let i = 0; i < categories.length; i++) {
        categoriesAndImgs.push({ [categories[i]]: imgs[i] });
      }
      this.setState(
        { categoriesAndImgs, isLoaded: true, category: true },
        () => {
          console.log(this.state.categoriesAndImgs);
        }
      );
    });
  };

  render() {
    return (
      <div>
        <PageTitle
          name="Categories"
          description="Everything you need, all in one place."
        />

        {this.state.isLoaded ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "spaceEvenly"
            }}
          >
            {this.state.categoriesAndImgs.map((categoriesAndImgs, index) => (
              <div style={{ padding: "40px" }} key={index}>
                <CategoriesDisplay
                  category={this.state.category}
                  categories={Object.keys(categoriesAndImgs)}
                  imgs={categoriesAndImgs[Object.keys(categoriesAndImgs)]}
                  index={Object.keys(categoriesAndImgs)}
                />
              </div>
            ))}
          </div>
        ) : (
          <Container style={{ position: "fixed", top: "50%", left: "50%" }}>
            <Spinner animation="border" />
          </Container>
        )}
      </div>
    );
  }
}

export default Categories;
