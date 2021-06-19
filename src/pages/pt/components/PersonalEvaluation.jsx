import React, { useMemo } from "react";
import Line from "./Line";
import Icon from "./Icon";
const PersonalEvaluation = (props) => {
  const { personal } = props;
  const ele = useMemo(() => {
    return personal.map((el) => (
      <li>
        <Icon personalUrl={true} />
        <span> {el.value}</span>
      </li>
    ));
  }, [personal]);
  return (
    <div>
      <Line title={"个人评价"} />
      <ul className="personal">{ele}</ul>
    </div>
  );
};
export default PersonalEvaluation;
