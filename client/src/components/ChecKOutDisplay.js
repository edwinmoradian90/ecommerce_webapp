import React from "react";
import { withRouter } from "react-router-dom";

function CheckOutDisplay(props) {
  const totalStyle = {
    display: "flex",
    flexDirection: "column"
  };

  if (props.total !== undefined) {
    return (
      <div style={totalStyle}>
        <h5 style={{ fontWeight: 250 }}>Sub Total</h5>$
        {parseFloat(props.subtotal).toFixed(2)}
        <h2 style={{ fontWeight: 250 }}>Total</h2>$
        {parseFloat(props.total).toFixed(2)}
      </div>
    );
  } else {
    return null;
  }
}

export default withRouter(CheckOutDisplay);
