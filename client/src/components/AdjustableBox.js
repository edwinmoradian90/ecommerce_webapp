import React from "react";
import { Card } from "react-bootstrap";

function AdjustableBox(props) {
  return (
    <div>
      <Card style={{ width: props.width || "18rem", height: props.height }}>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Img src={props.children} />
          <Card.Subtitle className="mb-2 text-muted">
            {props.subtitles}
          </Card.Subtitle>
          <Card.Text>{props.text}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AdjustableBox;
