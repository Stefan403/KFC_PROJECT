import React from "react";

const Card = (props) => (
  <div
    className="card"
    style={{
      width: "500px",
      alignItems: "center",
      marginTop: "5%",
      border: "solid 1px transparent",
      borderLeft: "solid 1px #F2F2F2F2",
      borderTop: "solid 1px #F2F2F2F2",
      boxShadow: "2px 5px #F2F2F2F2 ",
      padding: "2%",
    }}
  >
    {props.children}
  </div>
);

export default Card;
