import React, { Component } from "react";
import CarouselledItems from "../components/CarouselledItems";
import axios from "axios";
import MainItemDisplay from "../components/MainItemDisplay";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      featuredImgs: [],
      onSaleImgs: [],
      onSaleNames: [],
      names: [],
      isLoaded: false
    };
  }

  componentDidMount = () => {
    axios.get("/api/products/all").then(res => {
      let featuredImgs = this.getFeatured(res.data);
      let onSaleImgs = this.getOnSale(res.data);
      let onSaleNames = this.getOnSaleNames(res.data);
      let names = this.getNamesForFeatured(res.data);

      this.setState(
        {
          items: res.data,
          featuredImgs: featuredImgs,
          names: names,
          onSaleImgs: onSaleImgs,
          onSaleNames: onSaleNames,
          isLoaded: true
        },
        () => {
          console.log(this.state.isLoaded);
        }
      );
    });
  };

  getNamesForFeatured = items => {
    let names = items.map(item => item.name) || null;
    if (names) {
      return names;
    }
  };

  getFeatured = items => {
    let featured =
      items.map(item => item).filter(item => item.featured === true) || null;
    if (featured) {
      let featuredImgs = featured.map(item => item.img);
      return featuredImgs;
    }
  };

  getOnSale = items => {
    let onSale =
      items.map(item => item).filter(item => item.onsale === true) || null;
    if (onSale) {
      let onSaleImgs = onSale.map(item => item.img);
      return onSaleImgs;
    }
  };

  getOnSaleNames = items => {
    let onSale =
      items.map(item => item).filter(item => item.onsale === true) || null;
    if (onSale) {
      let onSaleNames = onSale.map(item => item.name);
      return onSaleNames;
    }
  };

  render() {
    return (
      <div>
        <CarouselledItems
          isLoad={this.state.isLoaded}
          items={this.state.items}
          featuredImgs={this.state.featuredImgs}
          names={this.state.names}
        />
        <div style={{ paddingTop: "30px" }}>
          <MainItemDisplay
            isLoad={this.state.isLoaded}
            imgs={this.state.featuredImgs}
            names={this.state.names}
            title="Featured"
            selector="one"
          />
        </div>
        <div style={{ paddingTop: "30px" }}>
          <MainItemDisplay
            isLoad={this.state.isLoaded}
            imgs={this.state.onSaleImgs}
            names={this.state.onSaleNames}
            title="Deals"
            selector="two"
          />
        </div>
        <div style={{ paddingTop: "30px" }}>
          <MainItemDisplay
            isLoad={this.state.isLoaded}
            imgs={this.state.featuredImgs}
            names={this.state.names}
            title="Recently viewed"
            selector="three"
          />
        </div>
      </div>
    );
  }
}

export default Main;
