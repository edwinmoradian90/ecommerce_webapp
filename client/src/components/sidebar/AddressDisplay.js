import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import "./AddressDisplay.css";

function AddressDisplay(props) {
  return (
    <div className="address">
      <Card style={{ width: "20.5rem" }}>
        <Card.Body>
          <Card.Title className="title">{props.title}</Card.Title>
          <Card style={{ width: "18rem" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>Address: {props.address}</ListGroup.Item>
              <ListGroup.Item>City: {props.city}</ListGroup.Item>
              <ListGroup.Item>State: {props.state}</ListGroup.Item>
              <ListGroup.Item>Zip: {props.zip}</ListGroup.Item>
            </ListGroup>
          </Card>
          <div className="links">
            <Card.Link id={props.id} onClick={props.edit} className="link">
              {props.link}
            </Card.Link>
            <span id={props.id} className="link" onClick={props.deleteAddress}>
              {props.link2}
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddressDisplay;
