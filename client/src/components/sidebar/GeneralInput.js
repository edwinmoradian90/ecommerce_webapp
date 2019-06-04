import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

function GeneralInput(props) {
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-default">
            {props.text}
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type={props.type}
          name={props.name}
          onChange={props.onChange}
          placeholder={props.placeholder}
          aria-label={props.label}
          aria-describedby="inputGroup-sizing-default"
          value={props.value}
        />
      </InputGroup>
    </div>
  );
}

export default GeneralInput;
