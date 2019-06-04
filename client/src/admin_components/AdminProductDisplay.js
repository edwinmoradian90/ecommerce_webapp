import React from "react";
import { Table } from "react-bootstrap";
import ProductEditNav from "./ProductEditNav";

function AdminProductDisplay(props) {
  const thead = (
    <React.Fragment>
      <ProductEditNav {...props} />
      <thead key={props.id + 1}>
        <tr>
          <th>#</th>
          <th>Category</th>
          <th>Name</th>
          <th>Price</th>
          <th>Date</th>
          <th>In stock</th>
          <th>Featured</th>
          <th>On sale</th>
        </tr>
      </thead>
    </React.Fragment>
  );

  const tbody = (
    <tbody>
      <tr onClick={props.editProduct} name={props.item.name}>
        <td style={{ width: "50px" }}>{props.id + 1}</td>
        <td style={{ width: "100px" }}>{props.item.category}</td>
        <td style={{ width: "150px" }} value={props.item.name}>
          {props.item.name}
        </td>
        <td style={{ width: "100px" }}>{props.item.price}</td>
        <td style={{ width: "200px" }}>{props.item.date}</td>
        <td style={{ width: "50px" }}>{props.item.instock.toString()}</td>
        <td style={{ width: "50px" }}>{props.item.featured.toString()}</td>
        <td style={{ width: "50px" }}>{props.item.onsale.toString()}</td>
      </tr>
    </tbody>
  );

  return (
    <div>
      <Table responsive="lg" hover>
        {props.id + 1 === 1 ? (
          <React.Fragment>
            {thead}
            {tbody}
          </React.Fragment>
        ) : (
          tbody
        )}
      </Table>
    </div>
  );
}

export default AdminProductDisplay;
