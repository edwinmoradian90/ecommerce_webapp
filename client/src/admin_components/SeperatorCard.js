import React from "react";
import { Card } from "react-bootstrap";

function SeperatorCard(props) {
  const style = {
    width: "40em"
  };
  return (
    <div style={style}>
      <Card body>{props.children}</Card>
    </div>
  );
}

export default SeperatorCard;
