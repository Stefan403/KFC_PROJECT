import React from "react";

const LayoutCenter = (props) => (
  <div
    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
  >
    {props.children}
  </div>
);

export default LayoutCenter;
