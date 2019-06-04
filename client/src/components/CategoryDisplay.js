import React from "react";
import { Card, Button } from "react-bootstrap";

function CategoryDisplay(props) {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.imgs} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.price}</Card.Text>
          <Button
            name={props.name}
            onClick={props.viewProduct}
            variant="primary"
          >
            View {props.name}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CategoryDisplay;
