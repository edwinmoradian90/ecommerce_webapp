import React from "react";
import ProductPageList from "./ProductPageList";

export default function ProductList(props) {
  return (
    <div className="product-listing">
      {props.products.map((product, i) => (
        <div key={i}>
          <ProductPageList product={product} />
        </div>
      ))}
    </div>
  );
}
