import React from "react";

function Title(props) {
  const style = {
    width: "20em",
    padding: "20px"
  };
  return (
    <div>
      <h1 style={style}>{props.title}</h1>
    </div>
  );
}

export default Title;
