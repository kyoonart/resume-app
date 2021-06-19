import React, { useCallback, useRef } from "react";
const Avatar = (props) => {
  const { avatarUrl } = props;
  console.log("url", avatarUrl);
  return (
    <div className="avatar">
      <img src={avatarUrl} alt="" />
      <span className="avatar-none">{avatarUrl}</span>
    </div>
  );
};
export default Avatar;
