import React from "react";
import { Form } from "react-bootstrap";

function GeneralInputNoLabel(props) {
  return (
    <div>
      <Form.Group controlId={props.controlId}>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          placeholder={props.placeholder}
          name={props.name}
          type={props.type}
          onChange={props.onChange}
          value={props.value}
          defaultValue={props.defaultValue}
        />
      </Form.Group>
    </div>
  );
}

export default GeneralInputNoLabel;
