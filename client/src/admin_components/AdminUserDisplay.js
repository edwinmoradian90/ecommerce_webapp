import React from "react";
import { withRouter } from "react-router-dom";
import { Table } from "react-bootstrap";

function AdminProductDisplay(props) {
  const thead = (
    <React.Fragment>
      <thead key={props.index + 1}>
        <tr>
          <th>#</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
          <th>Date joined</th>
          <th>Is admin?</th>
          <th>Logged in</th>
          <th>Recently viewed</th>
        </tr>
      </thead>
    </React.Fragment>
  );

  const tbody = (
    <tbody>
      <tr onClick={props.editUser} _id={props._id}>
        <td style={{ width: "50px" }}>{props.index}</td>
        <td style={{ width: "50px" }}>{props.first_name}</td>
        <td style={{ width: "100px" }}>{props.last_name}</td>
        <td style={{ width: "150px" }}>{props.email}</td>
        <td style={{ width: "100px" }}>{props.date}</td>
        <td style={{ width: "50px" }}>{props.recentlyViewed}</td>
        <td style={{ width: "200px" }}>{props.isAdmin}</td>
        <td style={{ width: "50px" }}>{props.loggedIn}</td>
      </tr>
    </tbody>
  );

  return (
    <div>
      <Table responsive="lg" hover>
        {props.index + 1 === 1 ? (
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

export default withRouter(AdminProductDisplay);
