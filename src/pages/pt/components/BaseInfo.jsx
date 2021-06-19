import React, { useMemo } from "react";
import Line from "./Line";
import Avatar from "./Avatar";
const BaseInfo = (props) => {
  const { name, position, baseInfos, avatarUrl } = props;
  const listEle = useMemo(() => {
    return (
      baseInfos &&
      baseInfos.map((element, i) => {
        if (element.href) {
          return (
            <li>
              <span>{`${element.title} : `}</span>
              <a
                className="base__info-person-link"
                href={element.value}
                key={element.key}
              >
                {element.value}
              </a>
            </li>
          );
        } else {
          return (
            <li key={element.key}>{`${element.title}  :  ${element.value}`}</li>
          );
        }
      })
    );
  }, [baseInfos]);
  return (
    <div className="base__info">
      <div className="base__info-person">
        <h1>{name}</h1>
        <h1>{position}</h1>
        <Avatar className="base__info-person-avatar" avatarUrl={avatarUrl} />
      </div>
      <Line width={"77vw"} title={"基本资料"} />
      <ul>{listEle}</ul>
    </div>
  );
};
export default BaseInfo;
