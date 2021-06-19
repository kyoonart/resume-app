import React from "react";

const Line = (props) => {
  const { title = "title", width = "100vw" } = props;
  return (
    <div className="line">
      <span>{title}</span>
      <div className="line-hr" style={{ width: width }}></div>
    </div>
  );
};
export default Line;
