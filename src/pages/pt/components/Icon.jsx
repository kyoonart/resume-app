import React from "react";
const Icon = (props) => {
  const { personalUrl } = props;
  return (
    <span>
      {personalUrl ? (
        <img
          src="https://img.icons8.com/windows/32/4a90e2/scroll.png"
          className="p-icon icon"
        />
      ) : (
        <img
          src="https://img.icons8.com/material-outlined/24/4a90e2/give-way.png"
          alt="icon"
          className="icon"
        />
      )}
    </span>
  );
};
export default Icon;
