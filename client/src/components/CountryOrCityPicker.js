import React from "react";
import { Form, Col } from "react-bootstrap";

function CountryOrCityPicker(props) {
  return (
    <div>
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>{props.location}</Form.Label>
        <Form.Control as="select">
          <option>{props.listName}</option>
          {props.options.map((item, i) => item)}
        </Form.Control>
      </Form.Group>
    </div>
  );
}

export default CountryOrCityPicker;
