import { useState, useCallback } from "react";
import Header from "../../components/Header/Header";
import "./Projects.css";
import ProjectTotal from "./ProjectTotal";

export default function Projects() {
  // Seed with three projects (or [] if you want to start empty)
  const [projects, setProjects] = useState([
    "Project 1",
    "Project 2",
    "Project 3",
  ]);

  const handleAddProject = useCallback(() => {
    const name = prompt("Add project name:")?.trim();
    if (!name) return;

    const exists = projects.some((p) => p.toLowerCase() === name.toLowerCase());
    if (exists) {
      alert("Project already exists!");
      return;
    }

    setProjects((prev) => [...prev, name]);
  }, [projects]);

  return (
    <div className="projects-page">
      <Header title="Projects" showTagline={false} background="alt" />

      <button className="proj-button" onClick={handleAddProject}>
        Add Project
      </button>

      <div className="projects-overview">
        {projects.map((name) => (
          <div className="proj" key={name}>
            <h2>{name}</h2>

            {/* Keep ProjectTotal functionality; show for Project 1 (adjust as needed) */}
            {name.toLowerCase() === "project 1" && <ProjectTotal />}
            {name.toLowerCase() === "project 2" && <ProjectTotal />}
            {name.toLowerCase() === "project 3" && <ProjectTotal />}
          </div>
        ))}
      </div>
    </div>
  );
}
