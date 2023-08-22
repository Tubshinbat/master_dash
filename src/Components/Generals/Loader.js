import React from "react";

const Loader = (props) => {
  return (
    <div
      className="load-main"
      style={{ display: props.show === true ? "block" : "none" }}
    >
      <div className="loader-box">
        {" "}
        <div className="loader"></div>
        {props.children}
      </div>
    </div>
  );
};

export default Loader;
