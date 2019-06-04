import React from "react";
import ProductListItem from "./ProductListItem";

export default function ProductList(props) {
  return (
    <div className="product-listing">
      {props.products.map((product, i) => (
        <div key={i}>
          <ProductListItem product={product} />
        </div>
      ))}
    </div>
  );
}
