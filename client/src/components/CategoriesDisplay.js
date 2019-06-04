import React from "react";
import { Card, Container, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function CategoryDisplay(props) {
  let categoryDisplay = e => {
    let category = e.target.getAttribute("index");
    props.history.push(`/categories/${category}`);
  };

  console.log(props.imgs);
  return (
    <Container>
      <Card index={props.index} style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{props.categories}</Card.Title>
          <Card.Img src={props.imgs} />
          <Card.Text>{props.text}</Card.Text>
          <Button onClick={categoryDisplay} index={props.index}>
            View {props.categories}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default withRouter(CategoryDisplay);
