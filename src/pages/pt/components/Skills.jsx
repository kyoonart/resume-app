import React, { useMemo } from "react";
import Line from "./Line";
import Icon from "./Icon";
const Skills = (props) => {
  const { skills } = props;
  const ele = useMemo(() => {
    return skills.map(
      (skill) => {
        return (
          <li key={skill.sky}>
            <Icon />
            <span>{skill.value}</span>
          </li>
        );
      },
      [skills]
    );
  });
  return (
    <div>
      <Line title={"个人技能"} />
      <ul className="skills">{ele}</ul>
    </div>
  );
};
export default Skills;
