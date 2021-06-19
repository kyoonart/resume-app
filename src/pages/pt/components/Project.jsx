import React, { useMemo } from "react";
import Line from "./Line";
import Icon from "./Icon";
const Project = (props) => {
  const { practice, lineTitle } = props;
  const ele = useMemo(() => {
    return practice.map((el) => {
      return (
        <li>
          <div className="practice__header">
            <span>
              <Icon />
              <span> {el.time}</span>
            </span>
            <span className="practice__header-base">{el.base}</span>
          </div>
          <div className="practice__main">
            <div>
              <strong>
                {el.type === "practice" ? "负责内容:" : "项目总结:"}
              </strong>
              <span>{el.main}</span>
            </div>
            {el?.skillStack ? (
              <div>
                <strong>技术栈: </strong>
                <span>{el.skillStack}</span>
              </div>
            ) : null}
            {el?.summarize ? (
              <div>
                <strong>总结: </strong>
                <span> {el.summarize}</span>
              </div>
            ) : null}
            {el?.address ? (
              <div>
                <strong>代码地址: </strong>
                <a href={el.address}>{el.address}</a>
              </div>
            ) : null}
          </div>
        </li>
      );
    });
  }, [practice]);
  return (
    <div>
      <Line title={lineTitle} />
      <ul className="practice">{ele}</ul>
    </div>
  );
};
export default Project;
