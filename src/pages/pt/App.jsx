import React, { useEffect, useState } from "react";
import { getSchema } from "../../utils";
import "./index.scss";
import BaseInfo from "./components/BaseInfo";
import Skills from "./components/Skills";
import Project from "./components/Project";
import PersonalEvaluation from "./components/PersonalEvaluation";
export default function App() {
  const [data, setJSON] = useState(getSchema());
  useEffect(() => {
    window.refresh = () => {
      setJSON(getSchema());
    };
  }, []);
  const {
    name,
    position,
    infos = [],
    skills = [],
    practice = [],
    project = [],
    baseInfos = [],
    personal = [],
    avatarUrl = "",
  } = data;
  return (
    <div>
      <header>
        <BaseInfo
          name={name}
          position={position}
          baseInfos={baseInfos}
          avatarUrl={avatarUrl}
        />
      </header>
      <Skills skills={skills} />
      <Project practice={practice} lineTitle="实习经历" />
      <Project practice={project} lineTitle="项目经历" />
      <PersonalEvaluation personal={personal} />
    </div>
  );
}
